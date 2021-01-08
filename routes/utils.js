const csrf = require("csurf");
const db = require("../db/models");
const csrfProtection = csrf({ cookie: true });
const { check } = require("express-validator");

// asyncHandler
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch((err) => next(err));

// validators below
const signUpValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Username")
    .isLength({ max: 20 })
    .withMessage("Username must not be more than 20 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The username is already used by another climber of GoodTrees"
          );
        }
      });
    }),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for email")
    .isLength({ max: 255 })
    .withMessage(
      "No email address longer than 255 characters can be registered on GoodTrees"
    )
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provide Email Address is already used by another climber of GoodTrees"
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long"),
  //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
  //.withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
];

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Email field cannot be empty"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password field cannot be empty"),
];

const createTreeValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for the tree")
    .isLength({ max: 30 })
    .withMessage("A goodtree does not have a name longer than 30 characters long")
    .custom((value) => {
      return db.Tree.findOne({ where: { name: value } }).then((tree) => {
        if (tree) {
          return Promise.reject(
            "Pick another name sucker, someone beat you to it."
          );
        }
      });
    }),
  check("cityState")
    .exists({ checkFalsy: true })
    .withMessage("Please provide the closest city and state to the tree")
    .isLength({ max: 40 })
    .withMessage("Please abbreviate the city/state to under 40 characters"),
  check("detLocation")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a message to help future climbers get to this tree"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a description to help future goodtree climbers")
]

const createReviewValidators = [
  check("reviewText")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your review for the tree.")
    .isLength({ max: 180 })
    .withMessage("Please tell us about the tree in 180 characters or less."),
  check("difficulty")
    .exists({ checkFalsy: true })
    .withMessage("Please tell us how difficult this tree is to climb."),
 check("funFactor")
    .exists({ checkFalsy: true })
    .withMessage("Please tell us how fun this tree is."),
  check("viewFromTop")
    .exists({ checkFalsy: true })
    .withMessage("Please tell us about the view.")
]

module.exports = {
  csrfProtection,
  asyncHandler,
  signUpValidators,
  loginValidators,
  createTreeValidators,
  createReviewValidators
};
