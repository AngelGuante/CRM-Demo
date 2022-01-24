const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role_permission_access', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permission',
        key: 'id'
      }
    },
    access_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'access',
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
    }
  }, {
    sequelize,
    tableName: 'role_permission_access',
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
