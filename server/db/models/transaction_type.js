const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transaction_type', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      // defaultValue: nextval(seq_transaction_type::regclass),
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
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    inorout: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    editable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'transaction_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_transaction_type",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
