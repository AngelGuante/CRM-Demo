const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer_contact', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contact_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contact_type',
        key: 'id'
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customer',
        key: 'id'
      }
    },
    contact: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'customer_contact',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_customer_contact",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
