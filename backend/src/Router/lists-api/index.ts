import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { pg as knex } from '../../../db/index'
import { validateList } from '../../utils/validateList'
import { redisClient } from '../../../cache-redis';

export const listRouter = Router();

// middleware that is specific to this router
listRouter.use((req, res, next) => {
  next();
})

listRouter.get('/api/v1/lists', async (req, res) => {
  const results = await knex.select('*').from('lists');
  res.json(results)
})

listRouter.get('/api/v1/lists/:id', async (req, res) => {
  const results = await knex('lists').where(knex.raw('id = ?', [req.params.id]));
  res.send(results)
})

listRouter.post('/api/v1/lists', async (req, res) => {
  console.log(`The list is ${JSON.stringify(req.body)}`)
  const userId = await knex.select('id').from('users').where('name', 'Michael')
  // userId = JSON.stringify(userId[0].id)

  const { name, description } = req.body;
  const listData = {
    id: uuid(),
    name,
    description,
    // TODO: update below to pull userId from state
    user_id: userId[0].id,
    created_at: new Date(),
    updated_at: new Date()
  }

  if (!validateList(listData)) {
    console.log("Invalid user")
    throw new Error('Invalid user')
  }

  const DbResult = await knex.insert(listData).into("lists");
  console.log(DbResult)
  // console.log(`The list is ${listData}`)

  res.json(listData).end();
})

listRouter.patch('/api/v1/lists/:id', async (req, res) => {
  let prevList = await knex('lists').where(knex.raw('id = ?', [req.params.id]));

  if (prevList.length === 0) {
    return res.status(404).send('List not found');
  }
  prevList = prevList[0]

  const { name, description } = req.body;

  const listData = {
    id: prevList.id,
    name: name ? name : prevList.name,
    description: description ? description : prevList.description,
    // TODO: update below to pull userId from state
    user_id: prevList.user_id,
    created_at: prevList.created_at,
    updated_at: new Date()
  }

  if (!validateList(listData)) {
    console.log("Invalid list")
    throw new Error('Invalid list')
  }

  const DbResult = await knex('lists').where({ id: req.params.id }).update(listData, ["id", "name", "description", "user_id", "created_at", "updated_at"]);
  console.log(DbResult)

  res.json(listData).end();
})

listRouter.delete('/api/v1/lists/:id', async (req, res) => {
  await knex('lists').where(knex.raw('id = ?', [req.params.id])).del(["id"])

  res.status(204).send(`Successfully deleted meal ${req.params.id}`);
})

// fetch('http://localhost:3001/api/v1/lists', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     listFormData: {
//       name: "Changed Name",
//       description: "lorem ipsum",
//       user_id: 1
//     }
//   })
// }).then((data) => {
//   console.log(data);
// })