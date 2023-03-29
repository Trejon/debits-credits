import { Router } from 'express'

export const mealsRouter = Router();

// middleware that is specific to this router
mealsRouter.use((req, res, next) => {
  next();
})

mealsRouter.get('/meals', (req, res) => {
  res.send('meals')
})

mealsRouter.get('/meals/:id', (req, res) => {
  res.send('Meal')
})

mealsRouter.post('/meals', (req, res) => {
  res.send('Create Meal')
})

mealsRouter.patch('/meals/:id', (req, res) => {
  res.send('Update Meal')
})

mealsRouter.delete('/meals/:id', (req, res) => {
  res.send('Delete Meal')
})