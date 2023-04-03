import express, { Response, Request } from 'express'
import { router } from './Router'

export const app = express()
const port = process.env.PORT || 3001;

app.use(router)

app.listen(port, () => {
  console.log(`I am now listening on port http://localhost:${port}`);
})


