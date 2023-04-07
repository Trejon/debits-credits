import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { pg as knex } from '../../../db/index'
import { validateUser } from '../../utils/validateUser'

declare module 'express-session' {
  interface Session {
    username: string;
    password: string;
  }
}

export const internalRouter = Router();

internalRouter.use((req, res, next) => {
  next();
})

// post '/api/v1/login', to: 'api/v1/sessions#create'
internalRouter.post('/api/v1/login', (req, res) => {
  const sess = req.session;
  const { username, password } = req.body
  sess.username = username
  sess.password = password
  // add username and password validation logic here later.If user is authenticated send the response as success
  res.end("success")
})

// post '/api/v1/signup', to: 'api/v1/users#create'
internalRouter.post('/api/v1/signup', async (req, res) => {
  console.log(`The user is ${JSON.stringify(req.body)}`)

  const { name, email, password } = req.body;

  const userData = {
    id: uuid(),
    name,
    email,
    password,
    created_at: new Date(),
    updated_at: new Date()
  }

  if (!validateUser(userData)) {
    console.log("Invalid user")
    throw new Error('Invalid user')
  }

  const DBResult = await knex.insert(userData).into("users");
  console.log(DBResult)
  res.json(req.body).end();
  // when you hit this API, your req should look like
  //   fetch('http://localhost:3001/api/v1/signup', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  // 		userFormData: {
  //     name: "another-test",
  //     email: "another@a.com",
  //     password: "password"
  //   }})
  // })
})

// get '/api/v1/get_current_user', to: 'api/v1/sessions#get_current_user'
internalRouter.get('/api/v1/get_current_user', (req, res) => {
  res.send('Hello World');
  // Another request to sessions/Redis cache
})

// delete '/api/v1/logout', to: 'api/v1/sessions#destroy'
internalRouter.delete('/api/v1/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/")
  })
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

internalRouter.get('/set-session', (req, res) => {
  req.session.username = 'Hello, Redis!';
  res.send('Session variable set.');
});

internalRouter.get('/get-session', (req, res) => {
  const myVar = req.session.username;
  res.send(`Session variable value: ${myVar}`);
});


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
// });