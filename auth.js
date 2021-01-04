const db = require("./db/models")

const loginUser = (req, res, user) => {
  req.session.auth = { userId: user.id }
}

const logoutUser = (req, res) => {
  // code here
};

const requireAuth = (req, res, next) => {
  // code here

};

const restoreUser = async (req, res, next) => {
  // code here
};

module.exports = {
    loginUser,
    logoutUser,
    requireAuth,
    restoreUser,
};
