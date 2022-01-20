const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company_owner', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_owner_status_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'company_owner_status',
        key: 'id'
      }
    },
    subcriptionplan_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'subcriptionplan',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    createdat: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'company_owner',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_company_owner",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
