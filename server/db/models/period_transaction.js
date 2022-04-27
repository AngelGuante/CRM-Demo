const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('period_transaction', {
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
    amount_on_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'amount_on_account',
        key: 'id'
      }
    },
    closedby_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    createdat: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    input_quantity: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    output_quantity: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    closed_amount: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'period_transaction',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_period_transaction",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
