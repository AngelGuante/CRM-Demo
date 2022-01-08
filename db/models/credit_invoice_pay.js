const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('credit_invoice_pay', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'invoice',
        key: 'id'
      }
    },
    createdby_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    identifiernumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'credit_invoice_pay',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_credit_invoice_pay",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
