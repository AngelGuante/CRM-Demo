const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('business_owner_business', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    business_owner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'business_owner',
        key: 'id'
      }
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'business',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'business_owner_business',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_business_owner_business",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
