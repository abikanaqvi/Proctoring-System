const User = require("../models/user");
const bcrypt = require("bcrypt")

const register = async (req, res) => {
  const { email, fullName, password } = req.body;

  const cheakmail = await User.findOne({ email });

  if (cheakmail) {
    return res.status(400).json({ msg: "Email already register" });
  } else {

    const hash_password = await bcrypt.hash(password, 10)
    const newUser = new User({ fullName, email, password:hash_password });
    await newUser.save();
    return res.status(201).json({ msg: "New user successfully register!!" });
  }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Convert email to lowercase for consistent matching
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "Email not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // If both email and password are correct
        return res.status(200).json({ msg: "User successfully login!!" });
    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
};


const signOut = async (req, res) =>{
    req.logout();
}


module.exports = {
    register,
    signIn,
    signOut
}



// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// const register = (req, res) => {
//     User.findOne({ email: req.body.email })
//         .exec((error, user) => {
//             // if email-id already exit
//             if (user) return res.status(409).json({ msg: `User alreay register` });

//             // if email-id not found => new user
//             const { fullName, email, password } = req.body;
//             const profilePicture = req.file.filename;

//             const _user = new User({
//                 fullName: fullName,
//                 email: email,
//                 password: password,
//                 profilePicture: profilePicture
//             })

//             _user.save((error, data) => {
//                 if (error) return res.status(400).json({ msg: "Something happened while storing new user", error });
//                 if (data) return res.status(201).json({ msg: "New user successfully register!!" });
//             })
//         })
// }

// const signIn = async (req, res) => {

// const {email, password } = req.body;

//  const cheakmail = await User.findOne({email})
//     if(cheakmail){
//         if(cheakmail.authenticate(password)){
//             const token = jwt.sign({_id:cheakmail._id, role:cheakmail.role}, process.env.JWT_SECRET, {expiresIn:'1d'})
//             res.cookie('token', token, {expiresIn:'1d'})
//             const {_id, fullName, email, role} = cheakmail;
//             res.status(200).json({token, user:{_id, fullName, email, role}})
//         }else{
//             res.status(400).json({msg:"Invalid Password"})
//         }
//     }else{
//         res.status(400).json({msg:"Email not found"})
//     }

// }

// const signOut = (req, res) => {
//     res.clearCookie("token");
//     res.status(200).json({ msg: `Sign-out Successfully...!` });
// }
