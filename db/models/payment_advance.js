const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_advance', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    credit_invoice_pay_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'credit_invoice_pay',
        key: 'id'
      }
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    amount: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment_advance',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_payment_advance",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
