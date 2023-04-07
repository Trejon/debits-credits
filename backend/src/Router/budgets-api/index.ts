import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { pg as knex } from '../../../db/index'
import { validateBudget } from '../../utils/validators/validateBudget'
import { redisClient } from '../../../cache-redis';

export const budgetRouter = Router();

// middleware that is specific to this router
budgetRouter.use((req, res, next) => {
  next();
})

budgetRouter.get('/api/v1/budgets', async (req, res) => {
  const results = await knex.select('*').from('budgets');
  res.json(results)
})

budgetRouter.get('/api/v1/budgets/:id', async (req, res) => {
  const results = await knex('budgets').where(knex.raw('id = ?', [req.params.id]));
  res.send(results)
})

budgetRouter.post('/api/v1/budgets', async (req, res) => {
  console.log(`The budget is ${JSON.stringify(req.body)}`)
  const userId = await knex.select('id').from('users').where('name', 'Michael')
  // userId = JSON.stringify(userId[0].id)

  const { title, amount, category } = req.body;
  const budgetData = {
    id: uuid(),
    title,
    amount,
    category,
    // TODO: update below to pull userId from state
    user_id: userId[0].id,
    created_at: new Date(),
    updated_at: new Date()
  }

  if (!validateBudget(budgetData)) {
    console.log("Invalid user")
    throw new Error('Invalid user')
  }

  const DbResult = await knex.insert(budgetData).into("budgets");
  console.log(DbResult)
  // console.log(`The budget is ${budgetData}`)

  res.json(budgetData).end();
})

budgetRouter.patch('/api/v1/budgets/:id', async (req, res) => {
  let prevBudget = await knex('budgets').where(knex.raw('id = ?', [req.params.id]));

  if (prevBudget.length === 0) {
    return res.status(404).send('Budget not found');
  }
  prevBudget = prevBudget[0]

  const { title, amount, category } = req.body;

  const budgetData = {
    id: prevBudget.id,
    title: title ? title : prevBudget.title,
    amount: amount ? amount : prevBudget.amount,
    category: category ? category : prevBudget.category,
    // TODO: update below to pull userId from state
    user_id: prevBudget.user_id,
    created_at: prevBudget.created_at,
    updated_at: new Date()
  }

  if (!validateBudget(budgetData)) {
    console.log("Invalid budget")
    throw new Error('Invalid budget')
  }

  const DbResult = await knex('budgets').where({ id: req.params.id }).update(budgetData, ["id", "name", "description", "user_id", "created_at", "updated_at"]);
  console.log(DbResult)

  res.json(budgetData).end();
})

budgetRouter.delete('/api/v1/budgets/:id', async (req, res) => {
  await knex('budgets').where(knex.raw('id = ?', [req.params.id])).del(["id"])

  res.status(204).send(`Successfully deleted budget ${req.params.id}`);
})

// fetch('http://localhost:3001/api/v1/budgets', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     budgetFormData: {
//       name: "Changed Name",
//       description: "lorem ipsum",
//       user_id: 1
//     }
//   })
// }).then((data) => {
//   console.log(data);
// })