
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // If no token, return unauthorized

  jwt.verify(token, '746f72d5cf0594825352c79510371409a94b13fb4f92ccde1484839e64cd4296', (err, user) => {
    if (err) return res.sendStatus(403); // If token is not valid, return forbidden
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

export default authenticateToken;