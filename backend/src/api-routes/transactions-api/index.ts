import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { validateTransaction } from '../../utils/validators/validateTransaction'
import { pg as knex, UserType } from '../../services/db/index'
import { validateUserIsLoggedIn } from '../../utils/validators/validateLogin';

export const transactionsRouter = Router();

// middleware that is specific to this router
transactionsRouter.use(async (req, res, next) => {
  let userLoggedIn = await validateUserIsLoggedIn(req, res, next)
  if (!userLoggedIn) {
    console.log("User is not logged in")
    return res.status(401).send('Please log in to use this API')
  }
  next();
})

transactionsRouter.get('/transactions/:user_id', async (req, res) => {
  const results = await knex.select('*').from('transactions').where(knex.raw('user_id = ?', [req.params.user_id]));
  res.json(results)
})

transactionsRouter.get('transactions/:id', async (req, res) => {
  const results = await knex('transactions').where(knex.raw('id = ?', [req.params.id]));
  res.json(results)
})

transactionsRouter.post('/transactions/:user_id', async (req, res) => {
  console.log(`The transaction is ${JSON.stringify(req.body)}`)
  const userId = await knex.select('id').from('users').where('name', 'Michael')
  const accountId = await knex.select('id').from('accounts').where('name', 'Chase')

  const { title, amount, credit, memo, occurrence_frequency, due_by_date, payee } = req.body;
  const transactionData = {
    id: uuid(),
    title,
    amount,
    credit,
    memo,
    occurrence_frequency,
    due_by_date,
    payee,
    user_id: userId[0].id,
    account_id: accountId[0].id,
    updated_at: new Date(),
    created_at: new Date()
  }

  if (!validateTransaction(transactionData)) {
    console.log("Invalid Transaction")
    throw new Error('Invalid transaction')
  }

  const dbResult = await knex.insert(transactionData).into("transactions");
  console.log(dbResult)
  console.log(`The transaction is ${transactionData}`)

  res.json(transactionData).end();
})

transactionsRouter.patch('/transactions/:id', async (req, res) => {
  let prevTransaction = await knex('transactions').where(knex.raw('id = ?', [req.params.id]));

  if (prevTransaction.length === 0) {
    return res.status(404).send('Transaction not found');
  }
  prevTransaction = prevTransaction[0]

  const { title, amount, credit, memo, occurrence_frequency, due_by_date, payee } = req.body;

  const transactionData = {
    id: prevTransaction.id,
    title: title ? title : prevTransaction.title,
    amount: amount ? amount : prevTransaction.amount,
    credit: credit ? credit : prevTransaction.credit,
    memo: memo ? memo : prevTransaction.memo,
    occurrence_frequency: occurrence_frequency ? occurrence_frequency : prevTransaction.occurrence_frequency,
    due_by_date: due_by_date ? due_by_date : prevTransaction.due_by_date,
    payee: payee ? payee : prevTransaction.payee,
    user_id: prevTransaction.user_id,
    account_id: prevTransaction.account_id,
    updated_at: new Date(),
    created_at: prevTransaction.created_at
  }

  if (!validateTransaction(transactionData)) {
    console.log("Invalid transaction")
    throw new Error('Invalid transaction')
  }

  const DbResult = await knex('transactions').where({ id: req.params.id }).update(transactionData, ["id", "name", "description", "user_id", "created_at", "updated_at"]);
  console.log(DbResult)

  res.json(transactionData).end();
})

transactionsRouter.delete('/transactions/:id', async (req, res) => {
  await knex('transactions').where(knex.raw('id = ?', [req.params.id])).del(["id"])

  res.status(204).send(`Successfully deleted transaction ${req.params.id}`);
})