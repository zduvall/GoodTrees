const express = require("express");
const { requireAuth } = require("../auth.js");

const db = require("../db/models");
const { asyncHandler } = require("./utils");

const { getClimberScore } = require('./get-scores')


const router = express.Router();

//Highest Climbers root page (/highest-climbers/)
router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const users = await db.User.findAll( {
        include: {
            model: db.Tree,
            as: 'forestTrees',
            include: [
                {
                    model: db.Review,
                    as: 'reviews'
                }
            ]
        }
    })
    users.forEach((user) => {
        const climbedTrees = user.forestTrees.filter(tree => tree.ForestConnection.climbStatus);
        const climberScore = getClimberScore(climbedTrees);
        user.climberScore = climberScore;
        user.numOfTreesClimbed = climbedTrees.length;
    })
    //sort users by highest climberScore
    users.sort((a, b) => b.climberScore - a.climberScore);

    res.render("highest-climbers", {
        title: "Higest Rated Climbers",
        users
    })
}))

module.exports = router;