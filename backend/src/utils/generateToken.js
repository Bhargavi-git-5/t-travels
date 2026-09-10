const jwt = require("jsonwebtoken");

// Signs a JWT containing just the user's id and role.
// Keep the payload small - anything else can be looked up from the DB
// using the id, and a smaller token means a smaller header on every request.
function generateToken(userId, role) {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

module.exports = generateToken;
