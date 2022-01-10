const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('branch_office_product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product',
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
    cost: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'branch_office_product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_branch_office_product",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
