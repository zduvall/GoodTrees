// see tree-page.js in public javascript for associated browser js

const express = require("express");
const db = require("../db/models");
const router = express.Router();
const { asyncHandler } = require("./utils");
const { getTreeAvgScore } = require("./get-scores");

router.post("/",
  asyncHandler(async (req, res) => {
    const {
      difficulty,
      funFactor,
      viewFromTop
    } = req.body;

    // find all trees with coresponding attributes
    let trees = await db.Tree.findAll({
      include: [
        {
          model: db.Review,
          as: "reviews"
        },
        {
          model: db.User,
          as: "user",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const filterByAttr = function (attribute, strAttribut) {
      attribute = parseInt(attribute, 10)
      trees = trees.filter(tree => {
        const avg = getTreeAvgScore(tree, strAttribut);
        const min = attribute - .7
        const max = attribute + .7
        return min < avg && avg < max
      })
    }

    if (difficulty > 0) filterByAttr(difficulty, "difficulty")
    if (funFactor > 0) filterByAttr(funFactor, "funFactor")
    if (viewFromTop > 0) filterByAttr(viewFromTop, "viewFromTop")
    res.json(trees);
  })
);

module.exports = router;