import { v4 as uuid } from 'uuid'
import { userIds } from "./user-data"
import { listIds } from "./list-data"

const mealIds = {
  mealOne: uuid(),
  mealTwo: uuid(),
  mealThree: uuid(),
  mealFour: uuid(),
  mealFive: uuid()
}

export const mealData = [
  {
    "id": mealIds.mealOne,
    "name": "Peanut Butter Cookies",
    "kind": "Recipe",
    "meal_type": "Dessert",
    "description": "Sweet snack",
    "url": "https://www.allrecipes.com/gallery/best-peanut-butter-cookies/?internalSource=streams&referringId=362&referringContentType=Recipe%20Hub&clickId=st_trending_b",
    "meal_date": "2020-07-15",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00",
    "user_id": userIds.userOne,
    "list_id": listIds.listOne
  },
  {
    "id": mealIds.mealTwo,
    "name": "Buffalo Wild Wings",
    "kind": "Restaurant",
    "meal_type": "Lunch",
    "description": "Gameday",
    "url": "https://www.buffalowildwings.com/",
    "meal_date": "2019-06-21",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00",
    "user_id": userIds.userThree,
    "list_id": listIds.listTwo
  },
  {
    "id": mealIds.mealThree,
    "name": "Fuddruckers",
    "kind": "Restaurant",
    "meal_type": "Dinner",
    "description": "Family in Town",
    "url": "https://www.fuddruckers.com/",
    "meal_date": "2019-06-21",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00",
    "user_id": userIds.userThree,
    "list_id": listIds.listFour
  },
  {
    "id": mealIds.mealFour,
    "name": "Pasta",
    "kind": "Recipe",
    "meal_type": "Dinner",
    "description": "Quick and easy",
    "url": "https://www.allrecipes.com/recipe/23600/quick-and-easy-pasta-sauce/?internalSource=hub%20recipe&referringContentType=Search&clickId=cardslot%201",
    "meal_date": "2020-07-15",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00",
    "user_id": userIds.userOne,
    "list_id": listIds.listOne
  },
  {
    "id": mealIds.mealFive,
    "name": "Red Lobster",
    "kind": "Restaurant",
    "meal_type": "Dinner",
    "description": "Birthday celebration",
    "url": "https://www.redlobster.com/",
    "meal_date": "2019-02-03",
    "updated_at": "2020-07-15 00:00:00",
    "created_at": "2020-07-19 00:00:00",
    "user_id": userIds.userTwo,
    "list_id": listIds.listThree
  }
]