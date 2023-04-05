import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('meals', (table) => {
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.integer('list_id').unsigned().references('id').inTable('lists');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('lists', (table) => {
    table.dropColumn('user_id');
    table.dropColumn('list_id');
  })
}

