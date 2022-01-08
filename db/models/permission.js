const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permission', {
    id: {
      autoIncrement: true,
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
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'permission',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_permission",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
