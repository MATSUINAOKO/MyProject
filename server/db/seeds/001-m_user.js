/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("m_user").del();
  await knex("m_user").insert([
    { user_name: "user", ikon: "/user.jpg" },
    { user_name: "bot", ikon: "/bot.jpg" },
  ]);
};
