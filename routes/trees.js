const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth.js")
//Not sure if we might need express validator for Tree creation form, so just leaving for now
// const { check, validationResult } = require("express-validator");

const db = require("../db/models");
const { getTreeAvgScore } = require('./get-scores')

const { csrfProtection, asyncHandler, createTreeValidators } = require("./utils");
const user = require("../db/models/user.js");

const router = express.Router();

//GET all trees
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const trees = await db.Tree.findAll({
            include: ["user"],
            order: [["id"]],
        });
        res.render("Trees/trees-page", { trees });
    })
);

//GET a specific tree
router.get(
    "/:id(\\d+)",
    asyncHandler(async (req, res) => {
        const treeId = parseInt(req.params.id, 10);

        const tree = await db.Tree.findByPk(treeId,
            {
                include:
                    [{
                        model: db.Review,
                        as: 'reviews',
                        include: {
                            model: db.User,
                            as: 'reviewer'
                        }
                    },
                    {
                        model: db.User,
                        as: 'user'
                    }]
            });
        const avgDiff = getTreeAvgScore(tree, 'difficulty');
        const avgFun = getTreeAvgScore(tree, 'funFactor');
        const avgView = getTreeAvgScore(tree, 'viewFromTop');

        res.render("Trees/specific-tree", { tree, avgDiff, avgFun, avgView });
    })
);

//Create Tree
router.get("/new", csrfProtection, requireAuth, (req, res) => {
    const tree = db.Tree.build();
    res.render("Trees/create-tree", {
        title: "Create A New Tree",
        tree,
        csrfToken: req.csrfToken(),
    });
});

router.post('/new', csrfProtection, createTreeValidators, requireAuth, asyncHandler(async (req, res) => {
    const { name, cityState, detLocation, description } = req.body;


    const tree = db.Tree.build({ name, cityState, detLocation, description, adderId: res.locals.curUser.dataValues.id });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await tree.save();
        return res.redirect(`/users/${res.locals.curUser.dataValues.id}`);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("Trees/create-tree", {
            title: "Create A New Tree",
            tree,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
})
);
module.exports = router;
