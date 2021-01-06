// get tree's avg score (make sure to include all reviews on tree in)
const getTreeAvgScore = (tree, attribute) => {
  if(!tree.reviews.length) return 0
  
  let sum = 0;
  
  tree.reviews.forEach(review => {
    sum += review[attribute];
  });

  return sum / tree.reviews.length;
}

// get user's climber score (pass in user's climbedTrees and make sure to include all reviews)
const getClimberScore = (climbedTrees) => {
  if (!climbedTrees.length) return "No trees climbed yet!!!"
  let sum = 0;

  climbedTrees.forEach(tree => {
    sum += getTreeAvgScore(tree, "difficulty");
  })

  return sum / climbedTrees.length;
}

module.exports = {
  getTreeAvgScore,
  getClimberScore
};
