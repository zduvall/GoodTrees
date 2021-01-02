'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewText: {
      type: DataTypes.TEXT
    },
    treeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    reviewerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    difficulty: {
      allowNull: false,
      type: DataTypes.INTEGER,
      is: /[1-4]/,
    },
    funFactor: {
      allowNull: false,
      type: DataTypes.INTEGER,
      is: /[1-4]/,
    },
    viewFromTop: {
      allowNull: false,
      type: DataTypes.INTEGER,
      is: /[1-4]/,
    }
  }, {});
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, {foreignKey: 'ReviewerId'})
    Review.belongsTo(models.Tree, {foreignKey: 'TreeId'})
  };
  return Review;
};