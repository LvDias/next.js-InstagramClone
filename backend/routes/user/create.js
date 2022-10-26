const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/', (req, res) => {

    const checkEmail = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)
    const checkPhone = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)

    if(checkEmail.test(req.body.emailOrPhone)){

        prisma.user.create({
            data: {
                email: req.body.emailOrPhone,
                phone: null,
                fullName: req.body.fullName,
                username: req.body.username,
                password: req.body.password
            }
        }).then((user) => {
    
            res.cookie('user_info', user.id)
            res.redirect(req.body.redirect)
    
        })

    }
    
    if(checkPhone.test(req.body.emailOrPhone)){
        
        prisma.user.create({
            data: {
                email: null,
                phone: req.body.emailOrPhone,
                fullName: req.body.fullName,
                username: req.body.username,
                password: req.body.password
            }
        }).then((user) => {
    
            res.cookie('user_info', user.id)
            res.redirect(req.body.redirect)
    
        })

    }

})

const photo = require('./upload/photo')
router.use(photo)

module.exports = router