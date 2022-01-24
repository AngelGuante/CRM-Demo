const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('active_credit_invoice_costs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    branch_office_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch_office',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'active_credit_invoice_costs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_active_credit_invoice_costs",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
