import { Router } from 'express'

export const listRouter = Router();

// middleware that is specific to this router
listRouter.use((req, res, next) => {
  next();
})

listRouter.get('/api/v1/lists', (req, res) => {
  res.send('Lists')
})

listRouter.get('/api/v1/lists/:id', (req, res) => {
  res.send('List')
})

listRouter.post('/api/v1/lists', (req, res) => {
  res.send('Create List')
})

listRouter.patch('/api/v1/lists/:id', (req, res) => {
  res.send('Update List')
})

listRouter.delete('/api/v1/lists/:id', (req, res) => {
  res.send('Delete List')
})


