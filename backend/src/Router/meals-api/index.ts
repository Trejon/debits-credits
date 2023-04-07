import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { validateMeal } from '../../utils/validateMeal'
import { pg as knex, UserType } from '../../../db/index'

export const mealsRouter = Router();

// middleware that is specific to this router
mealsRouter.use((req, res, next) => {
  next();
})

mealsRouter.get('/api/v1/meals', async (req, res) => {
  const results = await knex.select('*').from('meals');
  res.json(results)
})

mealsRouter.get('/api/v1/meals/:id', async (req, res) => {
  const results = await knex('meals').where(knex.raw('id = ?', [req.params.id]));
  res.json(results)
})

mealsRouter.post('/api/v1/meals', async (req, res) => {
  console.log(`The meal is ${JSON.stringify(req.body)}`)
  const userId = await knex.select('id').from('users').where('name', 'Michael')

  const { name, meal_type, kind, url, description, meal_date } = req.body;
  const mealData = {
    id: uuid(),
    name,
    meal_type,
    kind,
    description,
    url,
    meal_date,
    user_id: userId[0].id,
    list_id: null,
    updated_at: new Date(),
    created_at: new Date()
  }

  if (!validateMeal(mealData)) {
    console.log("Invalid Meal")
    throw new Error('Invalid Meal')
  }

  const dbResult = await knex.insert(mealData).into("meals");
  console.log(dbResult)
  console.log(`The meal is ${mealData}`)

  res.json(mealData).end();
})

mealsRouter.patch('/api/v1/meals/:id', async (req, res) => {
  let prevMeal = await knex('meals').where(knex.raw('id = ?', [req.params.id]));

  if (prevMeal.length === 0) {
    return res.status(404).send('Meal not found');
  }
  prevMeal = prevMeal[0]

  const { name, description, meal_type, url, meal_date, kind } = req.body;

  const mealData = {
    id: prevMeal.id,
    name: name ? name : prevMeal.name,
    description: description ? description : prevMeal.description,
    // TODO: update below to pull userId from state
    meal_type: meal_type ? meal_type : prevMeal.meal_type,
    kind: kind ? kind : prevMeal.kind,
    url: url ? url : prevMeal.url,
    meal_date: meal_date ? meal_date : prevMeal.meal_date,
    user_id: prevMeal.user_id,
    list_id: prevMeal.list_id,
    updated_at: new Date(),
    created_at: prevMeal.created_at
  }

  if (!validateMeal(mealData)) {
    console.log("Invalid meal")
    throw new Error('Invalid meal')
  }

  const DbResult = await knex('meals').where({ id: req.params.id }).update(mealData, ["id", "name", "description", "user_id", "created_at", "updated_at"]);
  console.log(DbResult)

  res.json(mealData).end();
})

mealsRouter.delete('/api/v1/meals/:id', async (req, res) => {
  await knex('meals').where(knex.raw('id = ?', [req.params.id])).del(["id"])

  res.status(204).send(`Successfully deleted meal ${req.params.id}`);
})