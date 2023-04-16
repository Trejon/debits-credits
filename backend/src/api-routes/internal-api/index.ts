import express, { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { pg as knex } from '../../services/db/index'
import { validateUser } from '../../utils//validators/validateUser'
import bodyParser from 'body-parser';
import { redisClient, redisGetAsync, redisSetAsync } from '../../services/cache-redis/index'
import bcrypt from 'bcrypt'
import { kafkaClient, kafkaAdmin } from '../../services/kafka-client';
import { run1 } from '../../services/kafka-client/test-consumer-producer';

type User = {
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  password: string,
  updated_at: Date,
  created_at: Date
}
declare module 'express-session' {
  interface Session {
    user: string | number
  }
}

export const internalRouter = Router();

internalRouter.use((req, res, next) => {
  next();
})

internalRouter.use(express.json())

internalRouter.get('/api/v1/login', (req, res) => {
  res.json("You need to log in")
})

// post '/api/v1/login', to: 'api/v1/sessions#create'
internalRouter.post('/api/v1/login', async (req, res) => {
  console.log("REQ SESSION", JSON.stringify(req.session))
  const { username, password } = req.body
  // add username and password validation logic here later.If user is authenticated send the response as success
  // bcrypt password
  let user = await knex.select('*').from('users').where(knex.raw('username = ?', username));
  let savedPassword = user[0].password;

  if (savedPassword !== password && !bcrypt.compareSync(password, savedPassword)) {
    res.end("Those credentials were incorrect. Try again.")
  } else {
    req.session.cookie = user[0]
    await redisSetAsync('user', JSON.stringify(user[0]));
    res.end("success!")
  }
  console.log("Final Session", req.session)
})

// post '/api/v1/signup', to: 'api/v1/users#create'
internalRouter.post('/api/v1/signup', async (req, res) => {
  console.log(`The user is ${JSON.stringify(req.body)}`)

  let { first_name, last_name, username, email, password } = req.body;

  password ? password = bcrypt.hashSync(password, 10) : null
  //  bcrypt.compareSync('hellosf', hash)

  const userData = {
    id: uuid(),
    first_name,
    last_name,
    username,
    email,
    password,
    created_at: new Date(),
    updated_at: new Date()
  }

  if (!validateUser(userData)) {
    console.log("Invalid user")
    throw new Error('Invalid user')
  }

  try {
    await knex.insert(userData).into("users");
  } catch (err) {
    return res.send(err)
  }
  const user = await knex.select('*').from('users').where(knex.raw('username = ?', username));
  // console.log("USSSERR:::", DBResult)
  await redisSetAsync('user', JSON.stringify(user[0]));
  res.json(req.body).end();
  // when you hit this API, your req should look like
  //   fetch('http://localhost:3001/api/v1/signup', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     first_name: "Mark",
  //     last_name: "Twain",
  //     username: "mt",
  //     email: "mt@gmail.com",
  //     password: "password"
  //   })
  // })
})

// get '/api/v1/get_current_user', to: 'api/v1/sessions#get_current_user'
internalRouter.get('/api/v1/get_current_user', async (req, res) => {
  const user = await redisGetAsync("user").then((res: any) => JSON.parse(res))
  return res.json(user);
})

// delete '/api/v1/logout', to: 'api/v1/sessions#destroy'
internalRouter.delete('/api/v1/logout', (req, res) => {
  redisClient.del('user');
  res.redirect("/login")
})

// get '/api/v1/yelp', to: 'api/v1/yelp#fetch'
internalRouter.get('/api/v1/yelp', (req, res) => {
  res.send('Hello World');
})

// get '/api/v1/search', to: 'api/v1/yelp#search'
internalRouter.get('/api/v1/search', (req, res) => {
  res.send('Hello World');
})

// post '/api/v1/search', to: 'api/v1/yelp#search'
internalRouter.post('/api/v1/search', (req, res) => {
  res.send('Hello World');
})

// internalRouter.get('/set-session', (req, res) => {
//   req.session.username = 'Hello, Redis!';
//   res.send('Session variable set.');
// });

internalRouter.get('/get-session', (req, res) => {
  const user = req.session.user;
  res.send(`Session variable value: ${user}`);
});

// KAFKA TESTING
const consumer = kafkaClient.consumer({ groupId: 'accounts-api' });
const producer = kafkaClient.producer();

const topic = {
  topic: 'test-topic',
  numPartitions: 2,
  replicationFactor: 1,
  replicaAssignment: [],
  configEntries: [],
}

internalRouter.get('/kafka-set', async (req, res) => {
  await kafkaAdmin.connect();
  await kafkaAdmin.createTopics({
    validateOnly: false,
    waitForLeaders: false,
    timeout: 500,
    topics: [topic],
  })
  const producer = kafkaClient.producer()

  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

  await producer.disconnect()
  res.send('Kafka message sent')
})

internalRouter.get('/kafka-get', async (req, res) => {
  const consumer = kafkaClient.consumer({ groupId: 'test-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: any) => {
      console.log({
        value: message.value.toString(),
      })
    },
  })
  res.send('Kafka message received')
})

internalRouter.get('/kafka-test', async (req, res) => {
  run1().catch(async e => {
    console.error(e)
    consumer && await consumer.disconnect()
    producer && await producer.disconnect()
    process.exit(1)
  })
  res.send('Kafka message tested successfully')
})


// app.get("/", (req, res) => {
//   const sess = req.session;
//   if (sess.username && sess.password) {
//       if (sess.username) {
//           res.write(`<h1>Welcome ${sess.username} </h1><br>`)
//           res.write(
//               `<h3>This is the Home page</h3>`
//           );
//           res.end('<a href=' + '/logout' + '>Click here to log out</a >')
//       }
//   } else {
//       res.sendFile(__dirname + "/login.html")
//   }
// });

// app.post("/login", (req, res) => {
//   const sess = req.session;
//   const { username, password } = req.body
//   sess.username = username
//   sess.password = password
//   // add username and password validation logic here if you want.If user is authenticated send the response as success
//   res.end("success")
// });

// app.get("/logout", (req, res) => {
//   req.session.destroy(err => {
//       if (err) {
//           return console.log(err);
//       }
//       res.redirect("/")
//   });
// });9