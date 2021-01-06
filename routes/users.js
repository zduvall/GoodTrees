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

const { loginUser, logoutUser } = require("../auth.js");

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// User sign-up
router.get("/sign-up", csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render("Users/sign-up", {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken(),
  });
});

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

router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/Users/login");
});

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await db.User.findByPk(id, {
      include: {
        model: db.Tree,
        as: "forestTrees",
        include: {
          model: db.User,
          as: "user",
        },
      },
    });
    const climbedTrees = user.forestTrees.filter(
      (tree) => tree.ForestConnection.climbStatus
    );
    const wantToClimbTrees = user.forestTrees.filter(
      (tree) => !tree.ForestConnection.climbStatus
    );
    // console.log(wantToClimbTrees);
    // res.json(user.forestTrees[0].name);
    res.render("Users/single-user", { user, climbedTrees, wantToClimbTrees });
  })
);

module.exports = router;
