// get tree's avg score (make sure to include all reviews on any tree passed in)
// for attribute, pass in a string of "difficulty", "funFactor", or "viewFromTop"
const getTreeAvgScore = (tree, attribute) => {
  if (!tree.reviews.length) return 0;

  let sum = 0;

  tree.reviews.forEach((review) => {
    sum += review[attribute];
  });
  sum = sum / tree.reviews.length;

  return Number(sum.toFixed(2));
};

// get user's climber score (pass in user's climbedTrees and make sure to include all reviews on those trees)
const getClimberScore = (climbedTrees) => {
  if (!climbedTrees.length) return 0;

  let sum = 0;

  climbedTrees.forEach((tree) => {
    sum += getTreeAvgScore(tree, "difficulty");
  });

  return Number(sum.toFixed(2));
};

module.exports = {
  getTreeAvgScore,
  getClimberScore,
};
