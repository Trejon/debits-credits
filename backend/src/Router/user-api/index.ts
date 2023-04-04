import { Router } from 'express'
import { pg as knex, UserType } from '../../../db/index'
import bodyParser from 'body-parser';

export const userRouter = Router();
const jsonParser = bodyParser.json()

// middleware that is specific to this router
userRouter.use((req, res, next) => {
  next();
})

userRouter.get('/api/v1/user', (req, res) => {
  res.send('user details')
})

userRouter.get('/api/v1/users', async (req, res) => {
  const result = await knex.select('*').from('users')
  console.log("RESULT", result)

  // res.send(result.rows)
  res.send(result)
})


userRouter.patch('/api/v1/users/:id', (req, res) => {
  res.send('Update User')
})

// post '/api/v1/signup', to: 'api/v1/users#create'
userRouter.post('/api/v1/signup', jsonParser, (req, res) => {
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
  const { userFormData } = req.body;
  try {
    knex('users')
      .insert({
        created_at: new Date(),
        email: userFormData.email,
        name: userFormData.name,
        password: userFormData.password,
        updated_at: new Date(),
      }).then((result: any) => console.log("result", result))
      .then(() => res.send("User has been created."))
  } catch (error) {
    console.log(error);
    res.send("There was an issue creating this user.");
  }
})

// result = fetch('http://localhost:3001/api/v1/signup', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     userFormData: {
//       name: "another",
//       email: "another@a.com",
//       password: "password"
//     }
//   })
// }).then((result) => result.json()).then((result) => console.log("result", result))