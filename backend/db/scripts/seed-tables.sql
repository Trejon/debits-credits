DELETE FROM users;
DELETE FROM lists;
DELETE FROM meals;

INSERT INTO users (name, email, password, created_at, updated_at)
VALUES
('Antoinette', 'antoinette@email.com', 'password', '2020-07-05 00:00:00', '2020-07-15 00:00:00'),
('Michael', 'michael@email.com', 'password', '2020-07-19 00:00:00', '2020-07-15 00:00:00'),
('Troy', 'troy@email.com', 'password', '2020-07-29 00:00:00', '2020-07-15 00:00:00');

INSERT INTO lists("id","name","description","user_id","created_at","updated_at")
VALUES
(1,'All time favorites','A list of my favorite restaurants and recipes.',1,'2023-01-24 20:51:09.356843','2023-01-24 20:51:09.356843'),
(2,'Must try meals','A list of restaurants and recipes I really want to try.',1,'2023-01-24 20:51:09.362003','2023-01-24 20:51:09.362003');


INSERT INTO meals("id","name","meal_type","kind","description","url","meal_date","user_id","list_id","created_at","updated_at")
VALUES
(1,'Red Lobster','Dinner','Restaurant','Birthday celebration','https://www.redlobster.com/','2019-02-03',1,1,'2023-01-24 20:51:09.372587','2023-01-24 20:51:09.372587'),
(2,'Pulled Pork Sandwiches','Dinner','Recipe','Normal dinner','https://www.allrecipes.com/recipe/235566/chef-johns-pulled-pork-bbq/?internalSource=rotd&referringId=83&referringContentType=Recipe%20Hub','2019-10-21',1,2,'2023-01-24 20:51:09.378276','2023-01-24 20:51:09.378276'),
(3,'Fuddruckers','Dinner','Restaurant','Family in Town','https://www.fuddruckers.com/','2019-06-21',1,2,'2023-01-24 20:51:09.381576','2023-01-24 20:51:09.381576'),
(4,'Buffalo Wild Wings','Lunch','Restaurant','Gameday','https://www.buffalowildwings.com/','2019-06-21',1,1,'2023-01-24 20:51:09.384919','2023-01-24 20:51:09.384919'),
(5,'Peanut Butter Cookies','Dessert','Recipe','Sweet snack','https://www.allrecipes.com/gallery/best-peanut-butter-cookies/?internalSource=streams&referringId=362&referringContentType=Recipe%20Hub&clickId=st_trending_b','2020-07-15',1,1,'2023-01-24 20:51:09.387656','2023-01-24 20:51:09.387656');
