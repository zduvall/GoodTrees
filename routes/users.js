var express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');

const { csrfProtection, asyncHandler, signUpValidators } = require('./utils');


var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User sign-up
router.get('/sign-up', csrfProtection, (req, res) => {
  const user = db.User.build()
  res.render('Users/sign-up', { title: 'Sign Up', user, csrfToken: req.csrfToken()})
});

router.post('/sign-up', csrfProtection, signUpValidators, asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
  } = req.body;

  const user = db.User.build({username, email});
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('Users/sign-up', {
      title: 'Sign Up',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}))

module.exports = router;
