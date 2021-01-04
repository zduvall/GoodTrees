var express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const db = require("../db/models");

const { csrfProtection, asyncHandler, signUpValidators, loginValidators } = require("./utils");

const { loginUser } = require("../auth.js");

var router = express.Router();

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
      console.log(user.id);
      res.redirect(`/users/${user.id}`);
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
router.get('/login', csrfProtection, (req, res) => {
  res.render('Users/login', { csrfToken: req.csrfToken() });
});

//login POST
router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = db.User.findOne({ where: { email } })

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.string())

      if (passwordMatch) {
        loginUser(req, res, user)
      }
    }
  }

}));

module.exports = router;
