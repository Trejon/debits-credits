import { Router } from 'express'

export const listRouter = Router();

// middleware that is specific to this router
listRouter.use((req, res, next) => {
  next();
})

listRouter.get('/lists', (req, res) => {
  res.send('Lists')
})

listRouter.get('/lists/:id', (req, res) => {
  res.send('List')
})

listRouter.post('/lists', (req, res) => {
  res.send('Create List')
})

listRouter.patch('/lists/:id', (req, res) => {
  res.send('Update List')
})

listRouter.delete('/lists/:id', (req, res) => {
  res.send('Delete List')
})


