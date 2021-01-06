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
  createTreeValidators,
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

//GET a specific review
// router.get(
//   "/:id(\\d+)",
//   asyncHandler(async (req, res) => {
//     const reviewId = parseInt(req.params.id, 10);

//     const review = await db.Review.findByPk(reviewId);

//     res.render("Trees/create-review", { review });
//   })
// );

router.post(
  "/new",
  csrfProtection,
  createReviewValidators,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { difficulty, funFactor, viewFromTop, reviewText } = req.body;

    const review = db.Review.build({
      difficulty,
      funFactor,
      viewFromTop,
      reviewText,
      adderId: res.locals.user.dataValues.id,
    });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await review.save();
      return res.redirect(`/users/${user.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("/new", {
        title: "Create A New Tree",
        review,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);
module.exports = router;
