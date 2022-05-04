const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('credit_invoice_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'invoice_sell',
        key: 'id'
      }
    },
    initial: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creditamount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duesamount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duesquantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duesprofit: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'credit_invoice_detail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_credit_invoice_detail",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
