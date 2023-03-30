import { Router } from 'express'

export const internalRouter = Router();

internalRouter.use((req, res, next) => {
  next();
})

// post '/api/v1/login', to: 'api/v1/sessions#create'
internalRouter.post('/api/v1/login', (req, res) => {
  res.send('Hello World');
})

// post '/api/v1/signup', to: 'api/v1/users#create'
internalRouter.post('/api/v1/signup', (req, res) => {
  res.send('Hello World');
})

// get '/api/v1/get_current_user', to: 'api/v1/sessions#get_current_user'
internalRouter.get('/api/v1/get_current_user', (req, res) => {
  res.send('Hello World');
})

// delete '/api/v1/logout', to: 'api/v1/sessions#destroy'
internalRouter.delete('/api/v1/logout', (req, res) => {
  res.send('Hello World');
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