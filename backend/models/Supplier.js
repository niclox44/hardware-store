module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    }
  });

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Product, {
      foreignKey: 'supplierId',
      as: 'products'
    });
  };

  return Supplier;
};