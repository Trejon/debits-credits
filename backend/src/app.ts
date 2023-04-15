import express, { Response, Request } from 'express'
import compression from 'compression'
import { router } from './api-routes'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import { redisStore, redisSetAsync, redisGetAsync, redisClient } from './services/cache-redis/index'
import session from "express-session"
import { produceAndConsumeMessage } from './services/kafka-client/index'

dotenv.config()
const port = process.env.PORT || 3001;

export const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())

// Initialize sesssion storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 86500000 // session max age in miliseconds
    }
  })
)

produceAndConsumeMessage()


app.use(async (req, res, next) => {
  // await redisClient.connect()
  next();
})


// Use Redis connection pooling in your route handlers
app.get('/set-session', async (req: any, res: { send: (arg0: string) => void; }) => {
  await redisSetAsync('user', 'some user data');
  res.send('Session variable set.');
});

app.get('/get-session', async (req: any, res: { send: (arg0: string) => void; }) => {
  const user = await redisGetAsync('user');
  res.send(`Session variable value: ${user}`);
});

app.use(router)



app.listen(port, () => {
  console.log(`I am now listening on port http://localhost:${port}`);
})


