import express, {Response, Request} from 'express'

export const app = express()
let port = 3000;


app.get('/', (req: Request, res: Response, next: () => void) => {
  res.send("Hello World");
})

app.listen(port, () => {
  console.log(`I am now listening on port http://localhost:${port}`);
})


