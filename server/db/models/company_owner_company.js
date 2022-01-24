const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company_owner_company', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'company_owner',
        key: 'id'
      }
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'company',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'company_owner_company',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_company_owner_company",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
