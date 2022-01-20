const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('branch_office', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    createdat: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'branch_office',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_branch_office",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
