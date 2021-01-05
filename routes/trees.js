var express = require("express");
const bcrypt = require("bcryptjs");

//Not sure if we might need express validator for Tree creation form, so just leaving for now
// const { check, validationResult } = require("express-validator");

const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils");

var router = express.Router();


//GET all trees
router.get('/', asyncHandler(async (req, res) => {
    const trees = await db.Tree.findAll({ include: ['user'], order: [["name"]] });
    // console.log(trees);
    res.render('Trees/trees-page', { trees })
}));

//GET a specific tree
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const treeId = parseInt(req.params.id, 10);

    const tree = await db.Tree.findByPk(treeId);

    res.render('Trees/specific-tree', { tree });
}));


module.exports = router
