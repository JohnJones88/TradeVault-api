const jwt = require('jsonwebtoken');

const secretKey = "this-is-a-secret";

validateToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).send();
  }

  token = token.replace("Bearer ", "");

  
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      res.status(401).send();
      return;
    }

    next();
  });
}


function createToken(signup) {
  const token = jwt.sign({
    id: signup.id,
    firstName: signup.first_name,
    lastName: signup.last_name,
    email: signup.email
  }, secretKey, { expiresIn: '2h' });

  return token;
}

module.exports = { validateToken , createToken};