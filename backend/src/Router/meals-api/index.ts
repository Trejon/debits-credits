import { Router } from 'express'

export const mealsRouter = Router();

// middleware that is specific to this router
mealsRouter.use((req, res, next) => {
  next();
})

mealsRouter.get('/api/v1/meals', (req, res) => {
  res.send('meals')
})

mealsRouter.get('/api/v1/meals/:id', (req, res) => {
  res.send('Meal')
})

mealsRouter.post('/api/v1/meals', (req, res) => {
  res.send('Create Meal')
})

mealsRouter.patch('/api/v1/meals/:id', (req, res) => {
  res.send('Update Meal')
})

mealsRouter.delete('/api/v1/meals/:id', (req, res) => {
  res.send('Delete Meal')
})