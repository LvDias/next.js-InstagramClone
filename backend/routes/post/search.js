const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', (req, res) => {

    prisma.post.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    }).then((posts) => {

        res.json(posts)

    })

})

module.exports = router