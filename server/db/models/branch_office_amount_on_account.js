const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('branch_office_amount_on_account', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount_on_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'amount_on_account',
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
    tableName: 'branch_office_amount_on_account',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_branch_office_amount_on_account",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
