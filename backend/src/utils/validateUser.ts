import { pg as knex, UserType } from '../../db/index'

type User = {
  created_at: Date,
  email: string,
  name: string,
  password: string,
  updated_at: Date,
}

export const validateUser = (userObj: User) => {
  if (!userObj) return false;
  if (!userObj.name) return false;
  if (!userObj.email) return false;
  if (!userObj.password) return false;
  return true;
}