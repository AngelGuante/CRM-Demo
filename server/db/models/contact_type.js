const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contact_type', {
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
    tableName: 'contact_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_contact_type",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
