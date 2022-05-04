const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('credit_invoice_pay_profit', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    credit_invoice_pay_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'credit_invoice_pay_profit',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_credit_invoice_pay_profit",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
