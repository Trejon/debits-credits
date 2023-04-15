https://github.com/khezen/compose-postgres

to create new migrations:
npx knex migrate:make <file_name> -x ts

to see status of migrations:
npx knex migrate:list