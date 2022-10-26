const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const router = require('./router')
const cookieParser = require('cookie-parser')

app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));
app.use(cookieParser({
    domain: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())
app.use(router)

app.listen(port, () => {

    console.log(`Server running on port ${port}`)

})