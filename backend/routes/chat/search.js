const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/', (req, res) => {

    // userId: req.body.user_me
    // userId: req.body.user_for

    prisma.chat.findFirst({
        where: {
            users: {
                every: {
                    userId: {
                        in: [req.body.user_me, req.body.user_for]
                    }
                }
            }
        }
    }).then((chat) => {

        res.json(chat)

    })

})

module.exports = router