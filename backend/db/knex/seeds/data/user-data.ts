import { v4 as uuid } from 'uuid';

export const userIds = {
  userOne: uuid(),
  userTwo: uuid(),
  userThree: uuid()
}

export const userData = [
  {
    "id": userIds.userOne,
    "name": "Antoinette",
    "email": "antoinette@email.com",
    "password": "password",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-05 00:00:00"
  },
  {
    "id": userIds.userTwo,
    "name": "Michael",
    "email": "michael@email.com",
    "password": "password",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00"
  },
  {
    "id": userIds.userThree,
    "name": "Troy",
    "email": "troy@email.com",
    "password": "password",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-29 00:00:00"
  }
]