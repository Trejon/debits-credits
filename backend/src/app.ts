import express, { Response, Request } from 'express'
import { router } from './Router'
import * as dotenv from 'dotenv'
import { pg } from '../db/index'

dotenv.config()

export const app = express()
const port = process.env.PORT || 3001;

app.use(router)

pg.raw('SELECT * FROM users;').then((result) => console.log("result", result))

app.listen(port, () => {
  console.log(`I am now listening on port http://localhost:${port}`);
})


