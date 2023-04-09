import { Router } from 'express'
import { pg as knex, UserType } from '../../../db/index'
import bodyParser from 'body-parser';
import { validateUserIsLoggedIn } from '../../utils/validators/validateLogin';


export const userRouter = Router();
const jsonParser = bodyParser.json()

// middleware that is specific to this router
userRouter.use(async (req, res, next) => {
  let userLoggedIn = await validateUserIsLoggedIn(req, res, next)
  if (!userLoggedIn) {
    console.log("User is not logged in")
    return res.status(401).send('Please log in to use this API')
  }
  next();
})

userRouter.get('/api/v1/user/:id', async (req, res) => {
  // Will change later once id is captured in some sort of global state
  // Should only fetch the logged in users info
  console.log("HERE:")
  const results = await knex.select('*').from('users').where(knex.raw('id = ?', req.params.id));
  res.send(results)
})

userRouter.patch('/api/v1/users/:id', async (req, res) => {
  console.log("HERE:")
  const foundUser = await knex('users').where(knex.raw('id = ?', 1));
  if (foundUser.length === 0) {
    return res.status(404).send('User not found');
  }
  const { name, email, password } = req.body;

  foundUser.updated_at = new Date();

  try {
    knex('users')
      .where({ id: req.params.id })
      .update({
        name: name ? name : foundUser.name,
        email: email ? email : foundUser.email,
        password: password ? password : foundUser.password,
        updated_at: new Date()
      }, ['id', 'name', 'email', 'password', 'created_at', 'updated_at'])
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})


// when you hit this API, your req should look like
//   fetch('http://localhost:3001/api/v1/users/1', {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//    name: "Antoinette",
//    email: "antoinette@email.com",
//    password: "new password"
//   })
// })

