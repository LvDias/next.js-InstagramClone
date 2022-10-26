const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/', (req, res) => {

    prisma.message.findMany({
        where: {
            chatId: req.body.chatId
        },
        orderBy: {
            createdAt: 'asc'
        }
    }).then((messages) => {

        res.json(messages)

    })

})

module.exports = router