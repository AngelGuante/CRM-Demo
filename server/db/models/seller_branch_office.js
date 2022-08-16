const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller_branch_office', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'seller',
        key: 'id'
      }
    },
    branch_office_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch_office',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'seller_branch_office',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_seller_branch_office",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
