const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_status', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employee_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_employee_status",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
