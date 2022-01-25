const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history_changes_product_cost', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
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
    newprice: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    createat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'history_changes_product_cost',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_history_changes_product_cost",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
