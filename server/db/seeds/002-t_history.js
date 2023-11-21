/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("t_history").del();
  await knex("t_history").insert([
    { user_id: 1, talk: "おはよう", up_photo: "/user_sample.jpg" },
    { user_id: 2, talk: "おはよう", up_photo: "/bot_sample.jpg" },
  ]);
};
