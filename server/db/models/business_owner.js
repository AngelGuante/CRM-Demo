const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('business_owner', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    business_owner_status_id: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'business_owner_status',
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
    tableName: 'business_owner',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_business_owner",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
