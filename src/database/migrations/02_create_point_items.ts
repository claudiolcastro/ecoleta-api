import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('point_items', (table) => {
    table.increments('id').primary();

    table.integer('point')
      .notNullable()
      .references('id')
      .inTable('points');

    table.integer('item')
      .notNullable()
      .references('id')
      .inTable('points');
  });
}


export async function down(knex: Knex) {
  return knex.schema.dropTable('point_items');
}
