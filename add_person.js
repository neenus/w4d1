const settings = require("./settings.json");
let query = process.argv.slice(2);

var knex = require('knex')({
  client: 'pg',
  connection: settings
});

if (query.length != 3) {
  console.error('Please enter firstname, lastname and birthdat (yyyy-mm-dd)');
} else (
  knex('famous_people')
    .insert({
      first_name: query[0],
      last_name: query[1],
      birthdate: query[2]
    })
    .then((result) => {
      console.log(result);
      knex.destroy();
    })
);