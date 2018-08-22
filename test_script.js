const pg = require('pg');
const settings = require("./settings.json");
let query = process.argv.slice(2)[0];

const client = new pg.Client ({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.host,
  port      : settings.port,
  ssl       : settings.ssl
});

let getInfo = function (array) {
  let numOfResults = array.length;
  
  console.log(`Found ${numOfResults} person(s) by the name of '${query}':`);
  for (let i in array) {
    let firstName = array[i].first_name;
    let lastName = array[i].last_name;
    let dob = array[i].birthdate.toISOString().slice(0,10);
    console.log(`${parseInt(i)+1}: ${firstName} ${lastName} born '${dob}'`);
  }
}; 

function getPeople(query,callback){
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("Select * from famous_people where first_name = $1::text;", [query], (err, result) => {
    if (err) {
      return console.err("error running query", err);
    }
    callback(result.rows);
    client.end();
  });
});
}

getPeople(query,getInfo);