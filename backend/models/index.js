const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.sequelize = sequelize;
db.Sequelize = require("sequelize");

db.User = require("./User")(sequelize, DataTypes);
db.Category = require("./Category")(sequelize, DataTypes);
db.Product = require("./Product")(sequelize, DataTypes);
db.Supplier = require("./Supplier")(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
	if (db[modelName] && db[modelName].associate) {
		db[modelName].associate(db);
	}
});

module.exports = db;