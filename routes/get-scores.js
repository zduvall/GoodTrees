// get tree's avg score (make sure to include all reviews on any tree passed in)
// for attribute, pass in a string of "difficulty", "funFactor", or "viewFromTop"
const getTreeAvgScore = (tree, attribute) => {
  if(!tree.reviews.length) return 0
  
  let sum = 0;
  
  tree.reviews.forEach(review => {
    sum += review[attribute];
  });

  return sum / tree.reviews.length;
}

// get user's climber score (pass in user's climbedTrees and make sure to include all reviews on those trees)
const getClimberScore = (climbedTrees) => {
  if (!climbedTrees.length) return "No trees climbed yet!!!"
  
  let sum = 0;
  
  climbedTrees.forEach(tree => {
    sum += getTreeAvgScore(tree, "difficulty");
  })

  return sum;
}

module.exports = {
  getTreeAvgScore,
  getClimberScore
};
