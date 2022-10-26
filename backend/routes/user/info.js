const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', (req, res) => {

    if(req.cookies['user_info']){

        prisma.user.findUnique({
            where: {
                id: req.cookies['user_info']
            }
        }).then((user) => {

            res.json(JSON.stringify(user))

        })

    }else{

        res.json(null)

    }

})

module.exports = router