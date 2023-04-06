import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { pg as knex } from '../../../db/index'
import { validateUser } from '../../utils/validateUser'

export const internalRouter = Router();

internalRouter.use((req, res, next) => {
  next();
})

// post '/api/v1/login', to: 'api/v1/sessions#create'
internalRouter.post('/api/v1/login', (req, res) => {
  res.send('Hello World');
  // requests here will need to create a new session
  // might be a good opp to learn more about redis to cache sessions?
})

// post '/api/v1/signup', to: 'api/v1/users#create'
internalRouter.post('/api/v1/signup', async (req, res) => {
  console.log(`The user is ${JSON.stringify(req.body)}`)

  let { name, email, password } = req.body;

  let userData = {
    id: uuid(),
    name,
    email,
    password,
    created_at: new Date(),
    updated_at: new Date()
  }

  if (!validateUser(userData)) {
    console.log("Invalid user")
    throw new Error('Invalid user')
  }

  const DBResult = await knex.insert(userData).into("users");
  console.log(DBResult)
  res.json(req.body).end();
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
})

// get '/api/v1/get_current_user', to: 'api/v1/sessions#get_current_user'
internalRouter.get('/api/v1/get_current_user', (req, res) => {
  res.send('Hello World');
  // Another request to sessions/Redis cache
})

// delete '/api/v1/logout', to: 'api/v1/sessions#destroy'
internalRouter.delete('/api/v1/logout', (req, res) => {
  res.send('Hello World');
  // Another request to sessions to delete/Redis cache
})

// get '/api/v1/yelp', to: 'api/v1/yelp#fetch'
internalRouter.get('/api/v1/yelp', (req, res) => {
  res.send('Hello World');
})

// get '/api/v1/search', to: 'api/v1/yelp#search'
internalRouter.get('/api/v1/search', (req, res) => {
  res.send('Hello World');
})

// post '/api/v1/search', to: 'api/v1/yelp#search'
internalRouter.post('/api/v1/search', (req, res) => {
  res.send('Hello World');
})