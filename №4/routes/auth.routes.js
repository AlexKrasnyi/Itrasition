const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = Router()

const jwtSecret = 'myApp'
// /auth/register
router.post('/register', async (req, res) => {
    try{
        const {email, password} = req.baseUrl

        const newPeople = await User.findOne({email})

        if(newPeople){
            return res.status(400).json({message: `User ${ email} already exist`  })
        }

        const cryptPasword = await bcrypt.hash(password, 12)
        const user = new User({email, password: cryptPasword})

        await user.save()
        res.status(201).json({message: 'user created'})
    }catch(e) {
        res.status(500).json({message: `Error: ${e.message}`})
    }
})


// /auth/login
router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body
        const people = await User.findOne({email})
        if(!people) {
            res.status(400).json({message: 'user not found...'})
        }

        const isTruePasword = await bcrypt.compare(password, user.password) 
        if(!isTruePasword) {
            res.status(400).json({message : 'wrong password'})
        }

        const token = jwt.sign(
            {UserId : user.id},
            jwtSecret,
            {expiresIn: '1h'}
        )

        res
    }catch(e) {
        res.status(500).json({message: `Error: ${e.message}`})
    }
})
module.exports = router