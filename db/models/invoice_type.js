const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice_type', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'invoice_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_invoice_type",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
