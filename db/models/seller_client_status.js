const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller_client_status', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(40),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'seller_client_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_seller_client_status",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
