const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seller_client_status_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'seller_client_status',
        key: 'id'
      }
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'seller',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_seller",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
