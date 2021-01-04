const db = require("./db/models")

const loginUser = (req, res, user) => {
    req.session.auth = { userId: user.id }
}

module.exports = {
    loginUser,
};
