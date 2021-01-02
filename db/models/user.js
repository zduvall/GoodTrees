'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    hashedPassword: { type: DataTypes.STRING.BINARY, allowNull: false }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Review, { foreignKey: 'reviewerId'});
    User.hasMany(models.Tree, { foreignKey: 'treeId'});
    User.belongsToMany(models.Tree, {
      through: 'ForestConnection',
      otherKey: 'treeId',
      foreignKey: 'userId',
      as: 'forestTrees'
    });
    User.belongsToMany(models.Tree, {
      through: 'Review',
      otherKey: 'treeId',
      foreignKey: 'reviewerId',
      as: 'reviewedTrees'
    })
  };
  return User;
};