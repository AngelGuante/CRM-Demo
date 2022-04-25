const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice_buy', {
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
    createdfor_seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'seller',
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
    }
  }, {
    sequelize,
    tableName: 'invoice_buy',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_invoice_buy",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
