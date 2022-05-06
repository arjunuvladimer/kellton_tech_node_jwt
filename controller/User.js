const User = require('../model/User')
const bcrypt = require('bcryptjs')
const json = require('jsonwebtoken')


// VALIDATION OF USER INPUTS PRE REQUISITES
const Joi = require('@hapi/joi')

exports.signUp = async (req,res) => {
    
    // CHECKING IF USER EMAIL EXISTS ALREADY IN THE DATABASE
    const emailExist = await User.findOne({email: req.body.email})

    if(emailExist){
        res.status(400).send("Email already exists")
        return;
    }

    // Encrypt & Hashing the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.passowrd,salt)

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
            fname: Joi.string().min(3).required(),
            lname: Joi.string().min(3).required(),
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required(),
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