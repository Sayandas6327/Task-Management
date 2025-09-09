//loading the jwt token
const jwt = require('jsonwebtoken');

const checkAuthToken = (req,res,next)=>{
      try{
           const authHeader = req.headers['authorization'];
           //Bearer acbsgfsfsf
           const token = authHeader && authHeader.split(' ')[1];
           if(!token) return res.status(200).json({"message":"token is missing"});

           jwt.verify(token,process.env.SECRET_KEY);
           next();
      }
      catch(error){
          return res.status(200).json({"message":"JWT invalid or expired"});
      }
}

module.exports = checkAuthToken;
console.log("JWT token middleware is working");