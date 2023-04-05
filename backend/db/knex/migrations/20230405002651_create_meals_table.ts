import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('kind').notNullable();
    table.string('meal_type').notNullable();
    table.string('description');
    table.string('url');
    table.timestamp('meal_date').notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals');
}

