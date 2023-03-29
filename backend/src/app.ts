import express, { Response, Request } from 'express'
import { router } from './utils'

export const app = express()
const port = 3000;


// app.get('/', (req: Request, res: Response, _next: () => void) => {
//   res.send("Hello World");
// })

app.use(router)

app.listen(port, () => {
  console.log(`I am now listening on port http://localhost:${port}`);
})


