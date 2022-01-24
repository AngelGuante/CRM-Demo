const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('branch_office_contact', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    branch_office_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch_office',
        key: 'id'
      }
    },
    contact_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contact_type',
        key: 'id'
      }
    },
    contact: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'branch_office_contact',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_branch_office_contact",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
