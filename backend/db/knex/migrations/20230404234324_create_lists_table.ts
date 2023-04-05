import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('lists', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('lists');
}

