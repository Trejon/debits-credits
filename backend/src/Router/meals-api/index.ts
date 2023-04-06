import { Router } from 'express'
import { pg as knex, UserType } from '../../../db/index'

export const mealsRouter = Router();

// middleware that is specific to this router
mealsRouter.use((req, res, next) => {
  next();
})

mealsRouter.get('/api/v1/meals', async (req, res) => {
  const results = await knex.select('*').from('meals');
  res.send(results)
})

mealsRouter.get('/api/v1/meals/:id', async (req, res) => {
  const results = await knex('meals').where(knex.raw('id = ?', [req.params.id]));
  res.send(results)
})

mealsRouter.post('/api/v1/meals', (req, res) => {
  res.send('Create Meal')
})

mealsRouter.patch('/api/v1/meals/:id', (req, res) => {
  res.send('Update Meal')
})

mealsRouter.delete('/api/v1/meals/:id', async (req, res) => {
  await knex('meals').where(knex.raw('id = ?', [req.params.id])).del(["id"])

  res.status(204).send(`Successfully deleted meal ${req.params.id}`);
})