const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth.js");
//Not sure if we might need express validator for Tree creation form, so just leaving for now
// const { check, validationResult } = require("express-validator");

const db = require("../db/models");

const {
  csrfProtection,
  asyncHandler,
  createReviewValidators,
} = require("./utils");

const router = express.Router();

router.get(
  "/:id(\\d+)/new",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const review = db.Review.build();
    const treeId = parseInt(req.params.id, 10);
    const tree = await db.Tree.findByPk(treeId);
    res.render("Trees/create-review", {
      tree,
      review,
      csrfToken: req.csrfToken(),
    });
  })
);

// create or update review
router.post(
  "/new",
  csrfProtection,
  createReviewValidators,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { treeId, difficulty, funFactor, viewFromTop, reviewText } = req.body;

    const existingFC = await db.Review.findOne({
      where: {
        treeId,
        reviewerId: res.locals.curUser.dataValues.id
      }
    });

    const validatorErrors = validationResult(req);

    const review = db.Review.build({
      treeId,
      difficulty,
      funFactor,
      viewFromTop,
      reviewText,
      reviewerId: res.locals.curUser.dataValues.id,
    });

    if (validatorErrors.isEmpty()) {

      // update if already exists
      if (existingFC) {
        await existingFC.update({
          treeId,
          difficulty,
          funFactor,
          viewFromTop,
          reviewText,
          reviewerId: res.locals.curUser.dataValues.id,
        });
        // create if doesn't exist
      } else {
        await review.save();
      }
      return res.redirect(`/trees/${req.body.treeId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      const tree = await db.Tree.findByPk(treeId);
      res.render("Trees/create-review", {
        title: "Create A New Review",
        tree,
        review,
        errors,
        csrfToken: req.csrfToken(),
      });
    }

  })
);
module.exports = router;
