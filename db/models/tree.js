'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tree = sequelize.define(
    'Tree',
    {
      name: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
      },
      cityState: { type: DataTypes.STRING(40), allowNull: false },
      detLocation: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      coordinates: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      adderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users' },
      },
    },
    {}
  );
  Tree.associate = function (models) {
    Tree.belongsTo(models.User, { foreignKey: 'adderId', as: 'user' });
    Tree.belongsToMany(models.User, {
      through: 'ForestConnection',
      otherKey: 'userId',
      foreignKey: 'treeId',
      as: 'forestUsers',
    });
    Tree.hasMany(models.ForestConnection, {
      foreignKey: 'treeId',
      onDelete: 'cascade',
      hooks: true,
    });
    Tree.belongsToMany(models.User, {
      through: 'Review',
      otherKey: 'reviewerId',
      foreignKey: 'treeId',
      as: 'reviewAuthors',
    });
    Tree.hasMany(models.Review, {
      foreignKey: 'treeId',
      as: 'reviews',
      onDelete: 'cascade',
      hooks: true,
    });
  };
  return Tree;
};
