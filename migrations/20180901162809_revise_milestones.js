
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table) {
    table.integer('famous_people_id');
    table.foreign('famous_people_id').references('famous_people.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.table('milestones', function(table) {
    table.dropForeign('famous_people_id');
  });
};