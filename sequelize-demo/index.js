const Sequelize = require('sequelize');

// default user list
const users = [
  ["John", "Hancock"],
  ["Liz", "Smith"],
  ["Ahmed", "Khan"]
];
let User;

// setup a new database
const sequelize = new Sequelize('database', '', '', {
  host: '0.0.0.0',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: '.data/database.sqlite'
});

// authenticate with the database
sequelize.authenticate()
  .then(async (err) => {
    console.log('Connection has been established successfully.');
    // define a new table 'users'
    User = sequelize.define('users', {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      }
    });

    await setup();
    await getAll();
  })
  .catch(function (err) {
    console.log('Unable to connect to the database: ', err);
  });

// populate table with default users
async function setup() {
  await User.sync({force: true}) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
  // Add the default users to the database
  users.forEach(user => { // loop through all users
    User.create({firstName: user[0], lastName: user[1]}); // create a new entry in the users table
  });
}

async function getAll() {
  const users = await User.findAll()
  console.log(users)
}

// User.create({ firstName: request.query.fName, lastName: request.query.lName});
// User.destroy({where: {}});

