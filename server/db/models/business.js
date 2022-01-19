const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('business', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    businessnumber: {
      // autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdat: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'business',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_business",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
