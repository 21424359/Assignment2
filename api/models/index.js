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
db.companies = require("./companies.model.js")(sequelize, Sequelize);

// Add migrations to alter the already-live tables
async function runMigrations() {
  const queryInterface = sequelize.getQueryInterface();
  try {
    console.log("Adding address column");
    await queryInterface.addColumn("contacts", "address", {
      type: Sequelize.STRING,
      allowNull: true
    }).catch(() => console.log("Column 'address' already exists in contacts table"));

    console.log("Updating phone columns");
    await queryInterface.renameColumn("phones", "name", "phone_type")
      .catch(() => console.log("Column 'name' already renamed"));
    await queryInterface.renameColumn("phones", "number", "phone_number")
      .catch(() => console.log("Column 'number' already renamed"));

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
  console.err("Unable to connect to database. ", err); 
});

module.exports = db;
