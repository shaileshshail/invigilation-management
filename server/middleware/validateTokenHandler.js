const jwt = require("jsonwebtoken");

const validateToken = async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token =authHeader.split(" ")[1];
        //console.log("vali token",token)

        await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            //console.log("vali",decode.user)
            req.user = decode.user;//append the decoded user in req to pass to router 
            next();//next() : It will run or execute the code after all the middleware function is finished.

        });
    }
    if(!token){
        res.sendStatus(401);
    }
};

module.exports = validateToken;