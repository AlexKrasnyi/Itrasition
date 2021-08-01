const express = require('express')
const mongoose = require('mongoose')
const bp = require('body-parser')
const dbUrl = 'mongodb+srv://Oleksandr:987654321@cluster0.hrt60.mongodb.net/my-app?retryWrites=true&w=majority'


const app = express()
const PORT = 2208
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
// app.use(cors()) 
app.use(`/auth/`, require('./routes/auth.routes'))



async function run () {
    try{
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`))
    } catch(e) {
        console.log(`Server Error: ${e.message}`)
        process.exit()
    }
}
run()
// app.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`))


