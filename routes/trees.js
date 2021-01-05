var express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const {requireAuth} = require("../auth.js")
//Not sure if we might need express validator for Tree creation form, so just leaving for now
// const { check, validationResult } = require("express-validator");

const db = require("../db/models");

const { csrfProtection, asyncHandler, createTreeValidators} = require("./utils");

var router = express.Router();


//GET all trees
router.get('/', asyncHandler(async (req, res) => {
    const trees = await db.Tree.findAll({ include: ['user'], order: [["name"]] });
    console.log(trees);
    res.render('Trees/trees-page', { trees })
}));

// //GET a specific tree
// router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
//     const treeId = parseInt(req.params.id, 10);

//     const tree = await db.Tree.findByPk(treeId);

//     res.render('Trees/specific-tree', { tree });
// }));

//Create Tree
router.get('/new', csrfProtection, requireAuth, (req, res) => {
    const tree = db.Tree.build();
    res.render('Trees/create-tree', {
        title: "Create A New Tree",
        tree,
        csrfToken: req.csrfToken()
    })
})

router.post('/new', csrfProtection, createTreeValidators, requireAuth, asyncHandler(async (req, res) => {
    const {name, cityState, detLocation, description} = req.body;


    const tree = db.Tree.build({name, cityState, detLocation, description, adderId: res.locals.user.dataValues.id});
    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()) {
        await tree.save();
        return res.redirect(`/users/${user.id}`);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("Trees/new", {
            title: "Create A New Tree",
            tree,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}))
module.exports = router
