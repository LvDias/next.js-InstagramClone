const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/', (req, res) => {

    prisma.chat.create({
        data: {
            users: {
                create: [
                    {
                        userId: req.body.user_me
                    },
                    {
                        userId: req.body.user_for
                    }
                ]
            }
        }
    }).then((chat) => {

        res.json(chat)

    })

})

module.exports = router