const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('amount_on_account', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    account_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_type',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'amount_on_account',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_amount_on_acount",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
