const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_role', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'job',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'job_role',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_job_role",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
