const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role_permission', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'permission',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'role_permission',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_role_permission",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
