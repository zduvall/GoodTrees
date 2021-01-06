// get tree's avg difficulty score (make sure to include all reviews on tree in)
const getTreeAvgDiffScores = (tree) => {
  let sum = 0;
  let num = 0;
  tree.reviews.forEach(review => {
    num ++;
    sum += review.difficulty;
  });
  return sum / num;
}

// get tree's avg funFactor score (make sure to include all reviews on tree in)
const getTreeAvgFunScores = (tree) => {

}
// get tree's viewFromTop score (make sure to include all reviews on tree in)
const getTreeAvgViewScores = (tree) => {

}

// get user's climber score (pass in user's climbedTrees and make sure to include all reviews)
const getClimberScore = (climbedTrees) => {
  let sum = 0;
  let num = 0;

  climbedTrees.forEach(tree => {
    num++;
    sum += getTreeAvgDiffScores(tree);
  })

  return sum / num;
}

module.exports = {
  getTreeAvgDiffScores,
  getTreeAvgFunScores,
  getTreeAvgViewScores,
  getClimberScore
};
