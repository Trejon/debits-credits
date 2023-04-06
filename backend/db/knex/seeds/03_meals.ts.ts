import { Knex } from "knex";
import { mealData } from "./data/meal-data";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("meals").del();

    // Inserts seed entries
    await knex("meals").insert(mealData);
};
