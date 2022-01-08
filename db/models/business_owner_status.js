const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('business_owner_status', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'business_owner_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_business_owner_status",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
