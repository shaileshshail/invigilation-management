const pool = require("../database/database");
const jwt = require("jsonwebtoken");


//@desc login user
//@route POST /auth/login
//@access public
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    console.log(req.body)
    if (!email || !password) {
        res.sendStatus(400);
        return
    }
    
    var [user] = await pool.query(`SELECT * FROM staffs where email="${email}";`)
    user=user[0]
    console.log(user);

    if (user && (password==user.password)) {
        console.log("creating accesstoken")
        const accessToken = jwt.sign({
            user: {
                firstname:user.name,
                email: user.email,
                role:user.role,
                staffid:user.staffId,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
        console.log("creating refreshtoken")
        const refreshToken = jwt.sign({
            user: {
                firstname:user.name,
                email: user.email,
                role:user.role,
                staffid:user.staffId,
            },
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" });
        
        //Saving refresh token of current users 
        await pool.query(`INSERT INTO currentUsers VALUES(?,?);`,[email,refreshToken]);
        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000,sameSite:"Lax" }); 

        res.status(200).json({ accessToken, refreshToken});
    }
    else {
        res.sendStatus(401);
    }
 
};

//@desc current user information
//@route GET /api/users/currentuser
//@access private
const currentUser = async (req, res) => {
    console.log("current user",req.user)
    res.status(200).json(req.user);
};


const logoutUser = async (req, res) => {
    console.log("logging out");
    const cookies = req.cookies;
    if (!cookies?.jwt) {   //No cookies or cookie doesnt have jwt
        res.status(204);
        return res.json({ message: "Logout successfull" });
    }

    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 ,sameSite:"Lax"});
    res.sendStatus(204);
};

//@desc returns new accesstoken
//@route get /api/refresh
//@access private
const handleRefreshToken = async(req,res)=>{
    const cookies=req.cookies

    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    let [foundUser]= await pool.query(`SELECT email,refreshToken FROM currentUsers WHERE refreshToken=?`,[refreshToken]);
    if(!foundUser[0]){
        console.log("here")
        return res.sendStatus(401);
    } 
    //console.log("found",foundUser)
    // verify jwt 
    await jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decode)=>{

        if(err || foundUser[0].email !== decode.user.email){
            return res.sendStatus(401);
        }
        //console.log("decode-handle",decode);
        const accessToken=jwt.sign({
            user: {
                firstname:decode.user.firstname,
                email: decode.user.email,
                role:decode.user.role,
                staffid:decode.user.staffid,
            },
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
        res.status(200).json({accessToken})
       
    });

}

module.exports = {handleRefreshToken};
module.exports = {
    loginUser,
    logoutUser,
    currentUser,
    handleRefreshToken,
}