const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/', (req, res) => {

    prisma.message.create({
        data: {
            content: req.body.content,
            chatId: req.body.chatId,
            userId: req.body.userId
        }
    }).then()

})

module.exports = router