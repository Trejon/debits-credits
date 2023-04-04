import express, { Response, Request } from 'express'
import { router } from './Router'
import * as dotenv from 'dotenv'

dotenv.config()

export const app = express()
const port = process.env.PORT || 3001;

app.use(router)
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`I am now listening on port http://localhost:${port}`);
})


