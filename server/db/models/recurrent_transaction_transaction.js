const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recurrent_transaction_transaction', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'transaction',
        key: 'id'
      }
    },
    recurrent_transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'recurrent_transaction',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'recurrent_transaction_transaction',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_recurrent_transaction_transaction",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
