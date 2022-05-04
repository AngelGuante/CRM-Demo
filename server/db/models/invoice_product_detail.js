const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice_product_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantitybeforeinvoice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    costoninvoice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priceoninvoice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'invoice_product_detail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_invoice_product_detail",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
