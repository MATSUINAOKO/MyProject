/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("t_history", function (table) {
    table.increments("id").primary();
    table.integer("user_id").references("m_user.id").onDelete("CASCADE");
    table.string("talk", [1000]);
    table.string("up_photo");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("t_history");
};
