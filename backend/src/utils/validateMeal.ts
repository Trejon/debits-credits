import { pg as knex, UserType } from '../../db/index'

type Meal = {
  name: string,
  meal_type: string,
  kind: string,
  url: string,
  description: string,
  meal_date: Date,
  created_at: Date,
  updated_at: Date,
}

export const validateMeal = (mealObj: Meal) => {
  if (!mealObj) return false;
  if (!mealObj.name) return false;
  if (!mealObj.meal_type) return false;
  if (!mealObj.kind) return false;
  if (!mealObj.url) return false;
  if (!mealObj.description) return false;
  if (!mealObj.meal_date) return false;
  return true;
}