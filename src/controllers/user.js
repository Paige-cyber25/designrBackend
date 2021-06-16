const { User } = require('../models');
const bcrypt = require('bcrypt');
//To get token by jsonwebtoken and the keyword is sign
const { sign } = require('jsonwebtoken');

//register User
const registerUser = async(req, res) => {
    const {fullName, email, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(401).json({
                status:"error",
                message:"User already exists"
            });
        }
        user = new User({
            fullName, 
            email, 
            password
        });
        //Hashing password (to avoid a password being hacked)
        //salt is being created by bycrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        //Generate token
        const token = sign({
            id:user._id,
        },
        "PATIENCE",
        {expiresIn:"24h"}
        );
        return res.status(200).json({
            status:"success",
            message:"User registered successfully",
            data: {
                token,
                user:{
                    _id: user._id,
                    fullName: user.fullName,
                   email:user.email
                }
            }
        })
    } catch (error) {
        console.log(error)
      return res.status(500).json({
          status:'error',
          error
      })
    }
}

//Login

const loginUser = async (req, res, next)=> {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json(
                {
                status,
                message:"Email or password incorrect"
                })
        }
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) {
            return res.status(401).json(
                {
                status,
                message:"Email or password incorrect"
            })
        }
        const token = sign({
            id:user._id,
        },
        "PATIENCE",
        {expiresIn:"24h"}
        );
        return res.status(200).json({
            status:"success",
            message:"Login successful",
            data:{
                token, 
                user:{
                    _id:user._id,
                    fullname:user.fullName,
                    email:user.email
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
          status:'error',
          error
      })
    }
}

const getUser = (req, res) => { 
     const {   
        user: { _id, name, email },
      } = req; 
      return res.status(200).json({ 
             status: "Success", 
                message: "User was retrieved successfully",   
                 data: {    
                       user: {        
                           _id,       
                            name,        
                            email,     
                        }, 
                }, 
    });
};

module.exports={registerUser, loginUser, getUser};