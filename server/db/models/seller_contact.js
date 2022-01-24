const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller_contact', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contact_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contact_type',
        key: 'id'
      }
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'seller',
        key: 'id'
      }
    },
    contact: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'seller_contact',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_seller_contact",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
