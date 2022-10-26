const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/id', (req, res) => {

    prisma.user.findUnique({
        where: {
            email: req.body.id
        },
        select: {
            id: true,
            email: true,
            phone: true,
            fullName: true,
            username: true,
            post: true,
            chat: true,
            message: true,
            photo: true,
            password: false
        }
    }).then((user) => {

        res.json(user)

    })

})

router.post('/email', (req, res) => {

    prisma.user.findFirst({
        where: {
            email: req.body.email
        },
        select: {
            id: true,
            email: true,
            phone: true,
            fullName: true,
            username: true,
            post: true,
            chat: true,
            message: true,
            photo: true,
            password: false
        }
    }).then((user) => {

        res.json(user)

    })

})

router.post('/phone', (req, res) => {

    prisma.user.findUnique({
        where: {
            email: req.body.phone
        },
        select: {
            id: true,
            email: true,
            phone: true,
            fullName: true,
            username: true,
            post: true,
            chat: true,
            message: true,
            photo: true,
            password: false
        }
    }).then((user) => {

        res.json(user)

    })

})

router.post('/username', (req, res) => {

    prisma.user.findUnique({
        where: {
            username: req.body.username
        },
        select: {
            id: true,
            email: true,
            phone: true,
            fullName: true,
            username: true,
            post: true,
            chat: true,
            message: true,
            photo: true,
            password: false
        }
    }).then((user) => {

        res.json(user)

    })

})

router.get('/all', (req, res) => {

    prisma.user.findMany({
        select: {
            id: true,
            email: true,
            phone: true,
            fullName: true,
            username: true,
            post: true,
            chat: true,
            message: true,
            photo: true,
            password: false
        }
    }).then((user) => {

        res.json(user)

    })

})

module.exports = router