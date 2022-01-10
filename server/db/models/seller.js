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
      allowNull: true,
      references: {
        model: 'seller_client_status',
        key: 'id'
      }
    },
    branch_office_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'branch_office',
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
