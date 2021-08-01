const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mySql = require('mysql')
const User = require('../models/user')
// var cors = require('cors')
const router = Router()
// const connection = require('../index')
const connection = mySql.createConnection({
    host     : 'sql11.freemysqlhosting.net',
    user     : 'sql11428684',
    password : 'tHCJET71zz',
    database : 'sql11428684'
  });

  let users = []


const jwtSecret = 'myApp'
// /auth/register
router.post('/register', async (req, res) => {
    try{
        const {email, password, name} = req.body
        const cryptPasword = await bcrypt.hash(password, 12)
        console.log(' cryptPasword', cryptPasword)
        await connection.connect((err) => {
            if(err){
              console.log('Error connecting to Db', err)
              return
            }
            console.log('Connection established')
        })
            await connection.query('SELECT * FROM users', (err,us) => {
                if(err) throw err;
              
                console.log('Data received from Db:');
                users = [...us]
              })

              if(users.length <= 0) {
                    await connection.query(`INSERT  users(name, email, password) VALUE ('${name}', '${email}', '${password}')`, (err,us) => {
                        console.log(`user created`, err )
                        console.log(`user created!`, us )
                                        
                })
                connection.end();
                    // console.log(`users not found`)
                    // const {email, password, name} = req.body
                    // connection.query(`INSERT  users(name, email, password) VALUE (${name}, ${email}, ${password})`, (err,us) => {
                    //     console.log(`user created`, )
                    // })
                    // const cryptPasword = bcrypt.hash(password, 12)
                    // console.log(`user`, cryptPasword)
                }
              console.log('users', users )
        //   })
    
        // const candidate = (arr) => {
        //     const {email, password, name} = req.body
        //     const newPeople = await arr.findOne({email})
        // }
          
        // const {email, password, name} = req.body

        // const newPeople = await users.findOne({email})
    

        // if(newPeople){
        //     return res.status(400).json({message: `User ${ email} already exist`})
        // }

        // const cryptPasword = await bcrypt.hash(password, 12)
        // const user = new User({email, password: cryptPasword})

        // await user.save()
        res.status(201).json({message: 'user created'})
    }catch(e) {
        res.status(501).json({message: `Error: ${e.message}`})
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
        console.log('isTruePasword', isTruePasword)
        if(!isTruePasword) {
            res.status(400).json({message : 'wrong password'})
        }

        const token = jwt.sign(
            {UserId : user.id},
            jwtSecret,
            {expiresIn: '1h'}
        )

        res.json({token, UserId: user.id})
    }catch(e) {
        res.status(500).json({message: `Error: ${e.message}`})
    }
})
module.exports = router