const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Create database tables and models */
db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.phones = require("./phone.model.js")(sequelize, Sequelize);

async function runMigrations() {
  const queryInterface = sequelize.getQueryInterface();
  try {
    console.log("Adding address column");
    await queryInterface.addColumn("contacts", "address", {
      type: Sequelize.STRING,
      allowNull: true
    }).catch((err) => console.error("Column 'address' already exists in contacts table. ", err));

    console.log("Updating phone columns");
    await queryInterface.renameColumn("phones", "name", "phone_type")
      .catch((err) => console.error("Column 'name' already renamed. ", err));
    await queryInterface.renameColumn("phones", "number", "phone_number")
      .catch((err) => console.error("Column 'number' already renamed. ", err));


    console.log("Migration complete");
  } catch (err) {
    console.error("Migration failed!!", err);
  }
}

// Trigger migration after Sequelize connects 
sequelize.authenticate() .then(() => { 
  console.log("Database connected"); 
  runMigrations(); 
}) 
.catch(err => { 
  console.error("Unable to connect to database. ", err); 
});

module.exports = db;
