import { pg as knex, UserType } from '../../db/index'

type List = {
  created_at: Date,
  description: string,
  name: string,
  updated_at: Date,
}

export const validateList = (listObj: List) => {
  if (!listObj) return false;
  if (!listObj.name) return false;
  if (!listObj.description) return false;
  return true;
}