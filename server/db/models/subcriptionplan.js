const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subcriptionplan', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subcriptionplan',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_subcriptionplan",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
