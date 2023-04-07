import { pg as knex, UserType } from '../../../db/index'

type Budget = {
  title: string,
  category: string,
  amount: number,
  created_at: Date,
  updated_at: Date,
}

export const validateBudget = (budgetObj: Budget) => {
  if (!budgetObj) return false;
  if (!budgetObj.title) return false;
  if (!budgetObj.category) return false;
  if (!budgetObj.amount) return false;
  return true;
}