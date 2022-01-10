const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('real_state_invoice_product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    real_state_invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'real_state_invoice',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'real_state_invoice_product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_real_state_invoice_product",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
