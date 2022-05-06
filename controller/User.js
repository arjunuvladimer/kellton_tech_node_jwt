const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



// VALIDATION OF USER INPUTS PRE REQUISITES
const Joi = require('@hapi/joi')
const { expression } = require('@hapi/joi')

exports.signUp = async (req,res) => {
    
    // CHECKING IF USER EMAIL EXISTS ALREADY IN THE DATABASE
    const emailExist = await User.findOne({email: req.body.email})

    if(emailExist){
        res.status(400).send("Email already exists")
        return;
    }

    // Encrypt & Hashing the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    // Adding new User
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword
    })

    try{
        // Validation of User Inputs

        const registerationSchema = Joi.object({
            fname: Joi.string().min(3).max(255).required(),
            lname: Joi.string().min(3).max(255).required(),
            email: Joi.string().min(3).max(255).required().email(),
            password: Joi.string().min(8).max(255).required(),
        })

        const {error} = await registerationSchema.validateAsync(req.body)

        if(error){
            res.status(400).send(error.details[0].message)
            return;
        }else{
            // SAVE THE USER
            const saveUser = await user.save()
            res.status(200).send("user created successfully")
        }

    }catch(error){
        res.status(500).send(error)
    }

}

exports.login = async (req,res) =>{
    // VEIFIY WHETHER EMAIL EXISTS OR NOT
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Incorrect Email ID")

    // CHECKING IF USER PASSWORD MATCHES
    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    if(!validatePassword) return res.status(400).send("Incorrect Password")


    try{
        const loginSchema = Joi.object({
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required(),
        })

        const {error} = await loginSchema.validateAsync(req.body)

        if(error) return res.status(400).send(error.details[0].message)
        else{
            const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
            res.send(token) 
        }
    }catch(error){
        res.status(500).send(error)
    }

}


exports.getAllUsers = async (req,res) => {
    const allUsers = await User.find()
    try{
        res.status(200).send(allUsers)
    }catch(error){
        res.status(500).send(error)
    }
}