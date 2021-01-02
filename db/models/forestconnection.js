'use strict';
module.exports = (sequelize, DataTypes) => {
  const ForestConnection = sequelize.define('ForestConnection', {
    climbStatus: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    favStatus: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users'}
    },
    treeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Trees' }
    }
  }, {});
  ForestConnection.associate = function(models) {
    // associations can be defined here
  };
  return ForestConnection;
};