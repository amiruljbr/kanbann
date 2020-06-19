const jwt = require('jsonwebtoken');

function jwtSign(data){
  return jwt.sign(data, process.env.SECRET);
}

function jwtVerify(token){
  try {
    let decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  } catch(err) {
    return res.status(403).json({
      message:'wrong token/secret'
    })
  }
}

module.exports = {jwtSign,jwtVerify}

