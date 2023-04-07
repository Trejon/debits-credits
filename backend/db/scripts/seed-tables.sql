DELETE FROM budgets;
DELETE FROM transactions;
DELETE FROM accounts;
DELETE FROM users;

DO $$
DECLARE
  user1Id uuid = uuid_generate_v4();
  user2Id uuid = uuid_generate_v4();
  user3Id uuid = uuid_generate_v4();
  user4Id uuid = uuid_generate_v4();
  account1Id uuid = uuid_generate_v4();
  account2Id uuid = uuid_generate_v4();
  account3Id uuid = uuid_generate_v4();
  transaction1Id uuid = uuid_generate_v4();
  transaction2Id uuid = uuid_generate_v4();
  transaction3Id uuid = uuid_generate_v4();
  transaction4Id uuid = uuid_generate_v4();
  transaction5Id uuid = uuid_generate_v4();
  budget1Id uuid = uuid_generate_v4();
  budget2Id uuid = uuid_generate_v4();
BEGIN
INSERT INTO users ("id", "name", "email", "password", "created_at", "updated_at")
VALUES
(user1Id, 'Antoinette', 'antoinette@email.com', 'password', '2020-07-05 00:00:00', '2020-07-15 00:00:00'),
(user2Id, 'Michael', 'michael@email.com', 'password', '2020-07-19 00:00:00', '2020-07-15 00:00:00'),
(user3Id, 'Troy', 'troy@email.com', 'password', '2020-07-29 00:00:00', '2020-07-15 00:00:00'),
(user4Id, 'Jeremy', 'jer@email.com', 'password', '2020-07-29 00:00:00', '2020-07-15 00:00:00');
INSERT INTO accounts("id","name","balance","debit","credit_limit","bank","user_id","created_at","updated_at")
VALUES
(account1Id,'Checking',5000,true,NULL,'Chase',user1Id,'2023-01-24 20:51:09.356843','2023-01-24 20:51:09.356843'),
(account2Id,'Savings',2000000,true,NULL,'Bank of America',user1Id,'2023-01-24 20:51:09.356843','2023-01-24 20:51:09.356843'),
(account3Id,'Credit Card',8000,false,1000000000,'Wells Fargo',user1Id,'2023-01-24 20:51:09.356843','2023-01-24 20:51:09.356843');
INSERT INTO transactions("id","title","amount","credit","category","occurrence_frequency","due_by_date","payee","user_id","account_id","created_at","updated_at")
VALUES
(transaction1Id,'Red Lobster',5000,true,'Food',Null,'2019-02-03','Someone', user1Id, account2Id,'2023-01-24 20:51:09.372587','2023-01-24 20:51:09.372587'),
(transaction2Id,'Gas',3000,false,'Transportation',Null,'2019-02-03','Someone Else', user1Id, account1Id,'2023-01-24 20:51:09.378276','2023-01-24 20:51:09.378276'),
(transaction3Id,'Mortgage',900000,false,'Housing','Every month','2019-06-21','Someone New', user1Id, account2Id,'2023-01-24 20:51:09.381576','2023-01-24 20:51:09.381576'),
(transaction4Id,'School',50000,true,'Education','Every quarter','2019-06-21','Someone Old', user1Id, account1Id,'2023-01-24 20:51:09.384919','2023-01-24 20:51:09.384919'),
(transaction5Id,'Movies',4000,false,'Entertainment',NULL,'2020-07-15','Someone I dont know', user1Id, account3Id,'2023-01-24 20:51:09.387656','2023-01-24 20:51:09.387656');
INSERT INTO budgets("id","title","amount","category","user_id","created_at","updated_at")
VALUES
(budget1Id,'Summer Trip',400000,'Fun',user1Id,'2023-01-24 20:51:09.356843','2023-01-24 20:51:09.356843'),
(budget2Id,'Saving for remodel',200000,'Life', user1Id,'2023-01-24 20:51:09.362003','2023-01-24 20:51:09.362003');
END $$;

