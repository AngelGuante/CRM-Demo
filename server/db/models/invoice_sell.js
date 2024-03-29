const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice_sell', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    invoice_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'invoice_type',
        key: 'id'
      }
    },
    invoice_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'invoice_status',
        key: 'id'
      }
    },
    createdby_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    createdfor_customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
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
    },
    identifiernumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    amount: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'invoice_sell',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_invoice",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
