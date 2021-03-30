const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth.js');

const db = require('../db/models');
const { getTreeAvgScore } = require('./get-scores');

const {
  csrfProtection,
  asyncHandler,
  createTreeValidators,
} = require('./utils');

const router = express.Router();

//GET all trees
router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const trees = await db.Tree.findAll({
      include: ['user'],
      order: [['createdAt', 'DESC']],
    });
    res.render('Trees/trees-page', { trees });
  })
);

//GET a specific tree
router.get(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler(async (req, res) => {
    const treeId = parseInt(req.params.id, 10);
    const tree = await db.Tree.findByPk(treeId, {
      include: [
        {
          model: db.Review,
          as: 'reviews',
          include: {
            model: db.User,
            as: 'reviewer',
          },
        },
        {
          model: db.User,
          as: 'user',
        },
      ],
    });

    const avgDiff = getTreeAvgScore(tree, 'difficulty');
    const avgFun = getTreeAvgScore(tree, 'funFactor');
    const avgView = getTreeAvgScore(tree, 'viewFromTop');

    const existingFC = await db.ForestConnection.findOne({
      where: {
        userId: res.locals.curUser.id,
        treeId,
      },
    });

    const existingReview = await db.Review.findOne({
      where: {
        treeId,
        reviewerId: res.locals.curUser.id,
      },
    });

    res.render('Trees/specific-tree', {
      tree,
      avgDiff,
      avgFun,
      avgView,
      existingFC,
      existingReview,
      curUser: res.locals.curUser,
    });
  })
);

//Create Tree
router.get('/new', csrfProtection, requireAuth, (req, res) => {
  const tree = db.Tree.build();
  res.render('Trees/create-tree', {
    title: 'Create A New Tree',
    tree,
    csrfToken: req.csrfToken(),
  });
});

router.post(
  '/new',
  csrfProtection,
  createTreeValidators,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { name, cityState, detLocation, description } = req.body;

    const tree = db.Tree.build({
      name,
      cityState,
      detLocation,
      description,
      adderId: res.locals.curUser.dataValues.id,
    });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await tree.save();
      return res.redirect(`/trees/${tree.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('Trees/create-tree', {
        title: 'Create A New Tree',
        tree,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

// delete tree
router.delete(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler(async (req, res) => {
    const treeId = parseInt(req.params.id, 10);

    const treeToDelete = await db.Tree.findByPk(treeId);

    console.log('----------- here\'s the name -----------',treeToDelete.name);

    console.log(treeToDelete.destroy());

    // await Tree.destroy({
    //   where: {
    //     id: treeId,
    //   },
    // });

    // res.redirect(`/users/${res.locals.curUser.id}`);
    // return;
  })
);

module.exports = router;
