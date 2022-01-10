const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_status', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    branch_office_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'branch_office',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    editable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'product_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_product_status",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
