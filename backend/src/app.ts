import express, { Response, Request } from 'express'
import { router } from './Router'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import { sessionStore, redisSetAsync, redisGetAsync, redisClient } from '../cache-redis/index'
import session from "express-session"


dotenv.config()
const port = process.env.PORT || 3001;

export const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())


app.use(async (req, res, next) => {
  // await redisClient.connect()
  next();
})

// Initialize sesssion storage.
app.use(
  session({
    store: sessionStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard cat",
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
  })
)

// Use Redis connection pooling in your route handlers
app.get('/set-session', async (req: any, res: { send: (arg0: string) => void; }) => {
  await redisSetAsync('myVar', 'Hello, Redis!');
  res.send('Session variable set.');
});

app.get('/get-session', async (req: any, res: { send: (arg0: string) => void; }) => {
  const myVar = await redisGetAsync('myVar');
  res.send(`Session variable value: ${myVar}`);
});

app.use(router)



app.listen(port, () => {
  console.log(`I am now listening on port http://localhost:${port}`);
})


