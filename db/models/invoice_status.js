const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice_status', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'invoice_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_invoice_status",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
