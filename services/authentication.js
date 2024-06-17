import jwt from "jsonwebtoken";

// Todo: Move the secret key to a .env file
const JWT_SECRET = '746f72d5cf0594825352c79510371409a94b13fb4f92ccde1484839e64cd4296'

function generateUserToken(user) {
  const payload = {
    _id : user.id,
    email: user.email,
    username: user.username,
    profileImageUrl : user.profileImageUrl,
    role : user.role
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

function validateToken(token){
    const payload = jwt.verify(token, JWT_SECRET);
    console.log(payload);
    return payload;
}

export { generateUserToken, validateToken };