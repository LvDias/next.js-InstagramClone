const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/', (req, res) => {

    const checkEmail = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)
    const checkPhone = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)

    if(checkEmail.test(req.body.username)){

        prisma.user.findFirst({
            where: {
                email: req.body.username,
                password: req.body.password
            }
        }).then((user) => {

            user ? res.cookie('user_info', user.id) : null

            res.redirect(req.body.redirect)

        })

    }else if(checkPhone.test(req.body.username)){
        
        prisma.user.findFirst({
            where: {
                phone: req.body.username,
                password: req.body.password
            }
        }).then((user) => {

            user ? res.cookie('user_info', user.id) : null

            res.redirect(req.body.redirect)

        })

    }else{

        prisma.user.findFirst({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then((user) => {

            user ? res.cookie('user_info', user.id) : null

            res.redirect(req.body.redirect)

        })

    }

})

module.exports = router