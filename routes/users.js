const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const db = require("../db/models");

const {
  csrfProtection,
  asyncHandler,
  signUpValidators,
  loginValidators,
} = require("./utils");

const { loginUser, logoutUser, requireAuth } = require("../auth.js");

const { getClimberScore } = require("./get-scores");

const router = express.Router();

// User GET sign-up
router.get("/sign-up", csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render("Users/sign-up", {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken(),
  });
});

// User POST sign-up
router.post(
  "/sign-up",
  csrfProtection,
  signUpValidators,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const user = db.User.build({ username, email });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      return req.session.save((err) => {
        if (err) {
          next(err);
        } else {
          res.redirect(`/users/${user.id}`);
        }
      });
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("Users/sign-up", {
        title: "Sign Up",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

//login
router.get("/login", csrfProtection, (req, res) => {
  res.render("Users/login", { csrfToken: req.csrfToken() });
});

//login POST
router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });

      if (user !== null) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (passwordMatch) {
          loginUser(req, res, user);
          return req.session.save((err) => {
            if (err) {
              next(err);
            } else {
              res.redirect(`/users/${user.id}`);
            }
          });
        }
      }

      errors.push(
        "No GoodTrees climber exists with provided email and/or password"
      );
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render("Users/login", {
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

// logout
router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/Users/login");
});

// show individual user page
router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await db.User.findByPk(id, {
      include: {
        model: db.Tree,
        as: "forestTrees",
        include: [
          {
            model: db.User,
            as: "user",
          },
          {
            model: db.Review,
            as: "reviews",
            required: false,
          },
        ],
      },
      order: [[
        { model: db.Tree, as: 'forestTrees' },
        db.ForestConnection,
        "createdAt",
        "DESC"
      ]]
    });
    const climbedTrees = user.forestTrees.filter(
      (tree) => tree.ForestConnection.climbStatus
    );
    const wantToClimbTrees = user.forestTrees.filter(
      (tree) => !tree.ForestConnection.climbStatus
      );

    const climberScore = getClimberScore(climbedTrees);
    res.render("Users/single-user", {
      user,
      climbedTrees,
      wantToClimbTrees,
      climberScore,
    });
  })
);

// login demo user
router.post('/demo', asyncHandler(async (req, res) => {
  let user = await db.User.findOne({
    where: {
      username: "DemoClimber"
    }
  })
  loginUser(req, res, user);
  return req.session.save((err) => {
    if (err) {
      next(err);
    } else {
      res.redirect(`/users/${user.id}`);
    }
  })
}));

module.exports = router;


