import { v4 as uuid } from 'uuid'
import { userIds } from './user-data'

export const listIds = {
  listOne: uuid(),
  listTwo: uuid(),
  listThree: uuid(),
  listFour: uuid(),
}

export const listData = [
  {
    "id": listIds.listOne,
    "name": "Summer",
    "description": "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00",
    "user_id": userIds.userOne
  },
  {
    "id": listIds.listTwo,
    "name": "Road Trip",
    "description": "lorem ipsum dolor sit amet - lorem ipsum dolor sit amet lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00",
    "user_id": userIds.userThree
  },
  {
    "id": listIds.listThree,
    "name": "Wedding trip",
    "description": "lorem ipsum dolor sit ametlorem ipsum dolor sit amet - lorem ipsum dolor sit amet",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00",
    "user_id": userIds.userTwo
  },
  {
    "id": listIds.listFour,
    "name": "Tournement",
    "description": "lorem ipsum dolor sit amet",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00",
    "user_id": userIds.userThree
  }
]