import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { pg as knex } from '../../services/db/index'
import { validateAccount } from '../../utils/validators/validateAccount'
import { redisClient } from '../../services/cache-redis';
import { validateUserIsLoggedIn } from '../../utils/validators/validateLogin';

export const accountsRouter = Router();

// middleware that is specific to this router
accountsRouter.use(async (req, res, next) => {
  let userLoggedIn = await validateUserIsLoggedIn(req, res, next)
  if (!userLoggedIn) {
    console.log("User is not logged in")
    return res.status(401).send('Please log in to use this API')
  }
  next();
})

accountsRouter.get('/:user_id/accounts', async (req, res) => {
  const results = await knex.select('*').from('accounts').where(knex.raw('user_id = ?', [req.params.user_id]));
  res.json(results)
})

accountsRouter.get('/accounts/:id', async (req, res) => {
  const results = await knex('accounts').where(knex.raw('id = ?', [req.params.id]));
  res.send(results)
})

accountsRouter.post('/accounts', async (req, res) => {
  console.log(`The account is ${JSON.stringify(req.body)}`)
  const userId = await knex.select('id').from('users').where('name', 'Michael')
  // userId = JSON.stringify(userId[0].id)

  const { name, balance, debit, credit_limit, bank } = req.body;
  const accountData = {
    id: uuid(),
    name,
    balance,
    debit,
    credit_limit,
    bank,
    // TODO: update below to pull userId from state
    user_id: userId[0].id,
    created_at: new Date(),
    updated_at: new Date()
  }

  if (!validateAccount(accountData)) {
    console.log("Invalid user")
    throw new Error('Invalid user')
  }

  const DbResult = await knex.insert(accountData).into("accounts");
  console.log(DbResult)
  // console.log(`The account is ${accountData}`)

  res.json(accountData).end();
})

accountsRouter.patch('/accounts/:id', async (req, res) => {
  let prevAccount = await knex('account').where(knex.raw('id = ?', [req.params.id]));

  if (prevAccount.length === 0) {
    return res.status(404).send('List not found');
  }
  prevAccount = prevAccount[0]

  const { name, balance, debit, credit_limit, bank } = req.body;

  const accountData = {
    id: prevAccount.id,
    name: name ? name : prevAccount.name,
    balance: balance ? balance : prevAccount.balance,
    debit: debit ? debit : prevAccount.debit,
    credit_limit: credit_limit ? credit_limit : prevAccount.credit_limit,
    bank: bank ? bank : prevAccount.bank,
    // TODO: update below to pull userId from state
    user_id: prevAccount.user_id,
    created_at: prevAccount.created_at,
    updated_at: new Date()
  }

  if (!validateAccount(accountData)) {
    console.log("Invalid account")
    throw new Error('Invalid account')
  }

  const DbResult = await knex('accounts').where({ id: req.params.id }).update(accountData, ["id", "name"]);
  console.log(DbResult)

  res.json(accountData).end();
})

accountsRouter.delete('/accounts/:id', async (req, res) => {
  await knex('accounts').where(knex.raw('id = ?', [req.params.id])).del(["id"])

  res.status(204).send(`Successfully deleted account ${req.params.id}`);
})

// fetch('http://localhost:3001/accounts', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     accountFormData: {
//       name: "Changed Name",
//       description: "lorem ipsum",
//       user_id: 1
//     }
//   })
// }).then((data) => {
//   console.log(data);
// })