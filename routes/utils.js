const csrf = require('csurf');

const csrfProtection = csrf({cookie: true});

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch((err) => next(err));

const signUpValidators = [
    check('username')
      .exists({ checkFalsy: true})
      .withMessage('Please provide a value for Username')
      .isLength({ max: 20})
      .withMessage('Username must not be more than 20 characters long'),
    check('email')
      .exist({ checkFalsy: true })
      .withMessage('Please provide a value for email')
      .isLength({ max: 255})
      .withMessage('No email address longer than 255 characters can be registered on GoodTrees')
      .isEmail()
      .withMessage('Email Address is not a valid email')
      .custom((value) => {
        return db.User.findOne({ where: { email: value } })
          .then((user) => {
            if (user) {
              return Promise.reject('The provide Email Address is already used by another member of GoodTrees');
            }
          })
      }),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Password')
      .isLength({ max: 50 })
      .withMessage('Password must not be more than 50 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Confirm Password')
      .isLength({ max: 50 })
      .withMessage('Confirm Password must not be more than 50 characters long')
      .custom((value, { req }) => {
          if (value !== req.body.password) {
              throw new Error('Confirm Password does not match Password');
          }
          return true;
      })
  ]

module.exports = {
    csrfProtection,
    asyncHandler,
    signUpValidators
};