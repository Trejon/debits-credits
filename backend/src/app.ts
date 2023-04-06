import express, { Response, Request } from 'express'
import { router } from './Router'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';

dotenv.config()

const jsonParser = bodyParser.json()
export const app = express()
app.use(jsonParser)
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())

app.use(router)
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`I am now listening on port http://localhost:${port}`);
})


