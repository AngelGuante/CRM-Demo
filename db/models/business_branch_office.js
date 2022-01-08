const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('business_branch_office', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'business',
        key: 'id'
      }
    },
    branch_office_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'branch_office',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'business_branch_office',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_business_branch_office",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
