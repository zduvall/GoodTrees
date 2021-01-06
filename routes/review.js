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

router.post(
  "/new",
  csrfProtection,
  createReviewValidators,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { treeId, difficulty, funFactor, viewFromTop, reviewText } = req.body;

    const review = db.Review.build({
      treeId,
      difficulty,
      funFactor,
      viewFromTop,
      reviewText,
      reviewerId: res.locals.user.dataValues.id,
    });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await review.save();
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
