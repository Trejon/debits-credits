DELETE FROM meals;
DELETE FROM lists;
DELETE FROM users;

DO $$
DECLARE
  user1Id uuid = uuid_generate_v4();
  user2Id uuid = uuid_generate_v4();
  user3Id uuid = uuid_generate_v4();
  list1Id uuid = uuid_generate_v4();
  list2Id uuid = uuid_generate_v4();
  meal1Id uuid = uuid_generate_v4();
  meal2Id uuid = uuid_generate_v4();
  meal3Id uuid = uuid_generate_v4();
  meal4Id uuid = uuid_generate_v4();
  meal5Id uuid = uuid_generate_v4();
BEGIN
INSERT INTO users ("id", "name", "email", "password", "created_at", "updated_at")
VALUES
(user1Id, 'Antoinette', 'antoinette@email.com', 'password', '2020-07-05 00:00:00', '2020-07-15 00:00:00'),
(user2Id, 'Michael', 'michael@email.com', 'password', '2020-07-19 00:00:00', '2020-07-15 00:00:00'),
(user3Id, 'Troy', 'troy@email.com', 'password', '2020-07-29 00:00:00', '2020-07-15 00:00:00');
INSERT INTO lists("id","name","description","user_id","created_at","updated_at")
VALUES
(list1Id,'All time favorites','A list of my favorite restaurants and recipes.',user3Id,'2023-01-24 20:51:09.356843','2023-01-24 20:51:09.356843'),
(list2Id,'Must try meals','A list of restaurants and recipes I really want to try.',user1Id,'2023-01-24 20:51:09.362003','2023-01-24 20:51:09.362003');
INSERT INTO meals("id","name","meal_type","kind","description","url","meal_date","user_id","list_id","created_at","updated_at")
VALUES
(meal1Id,'Red Lobster','Dinner','Restaurant','Birthday celebration','https://www.redlobster.com/','2019-02-03',user1Id,list2Id,'2023-01-24 20:51:09.372587','2023-01-24 20:51:09.372587'),
(meal2Id,'Pulled Pork Sandwiches','Dinner','Recipe','Normal dinner','https://www.allrecipes.com/recipe/235566/chef-johns-pulled-pork-bbq/?internalSource=rotd&referringId=83&referringContentType=Recipe%20Hub','2019-10-21',user3Id,list1Id,'2023-01-24 20:51:09.378276','2023-01-24 20:51:09.378276'),
(meal3Id,'Fuddruckers','Dinner','Restaurant','Family in Town','https://www.fuddruckers.com/','2019-06-21',user2Id,null,'2023-01-24 20:51:09.381576','2023-01-24 20:51:09.381576'),
(meal4Id,'Buffalo Wild Wings','Lunch','Restaurant','Gameday','https://www.buffalowildwings.com/','2019-06-21',user3Id,list1Id,'2023-01-24 20:51:09.384919','2023-01-24 20:51:09.384919'),
(meal5Id,'Peanut Butter Cookies','Dessert','Recipe','Sweet snack','https://www.allrecipes.com/gallery/best-peanut-butter-cookies/?internalSource=streams&referringId=362&referringContentType=Recipe%20Hub&clickId=st_trending_b','2020-07-15',user1Id,list2Id,'2023-01-24 20:51:09.387656','2023-01-24 20:51:09.387656');
END $$;

