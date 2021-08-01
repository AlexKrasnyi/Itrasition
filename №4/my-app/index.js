const express = require('express')
// const mongoose = require('mongoose')
const bp = require('body-parser')
const mySql = require('mysql')
// const dbUrl = 'mongodb+srv://Oleksandr:987654321@cluster0.hrt60.mongodb.net/my-app?retryWrites=true&w=majority'


const app = express()
const PORT = 2208
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
// const connection = mySql.createConnection({
//   host     : 'sql11.freemysqlhosting.net',
//   user     : 'sql11428684',
//   password : 'tHCJET71zz',
//   database : 'sql11428684'
// });
app.use(`/auth/`, require('./routes/auth.routes'))


async function run () {
    try{
        // await connection.connect((err) => {
        //         if(err){
        //           console.log('Error connecting to Db', err)
        //           return
        //         }
        //         console.log('Connection established')
        //         connection.query('SELECT * FROM users', (err,rows) => {
        //             if(err) throw err;
                  
        //             console.log('Data received from Db:');
        //             console.log(rows);
        //           });
        //       })
        
        app.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`))
    } catch(e) {
        console.log(`Server Error: ${e.message}`)
        // process.exit()
        con.end((err) => {
            throw new Error({message: err.message})
          })
    }
}
run()

// module.exports = connection
