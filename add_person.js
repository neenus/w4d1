const settings = require("./settings.json");
let query = process.argv.slice(2)[0];

var knex = require('knex')({
  client: 'pg',
  connection: settings
});

knex('famous_people')
  .insert('')
  .asCallback((err, rows) => {
  if (err) {
    console.error("There is an error", err.stack);
    return false;
  }
  console.log(rows);
});