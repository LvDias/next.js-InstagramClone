const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const multer = require('multer')
let fileName

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/post/')
    },
    filename: function (req, file, cb) {
        fileName = require('crypto')
            .randomBytes(64)
            .toString('hex')

        // Extração da extensão do arquivo original:
        const fileExt = file.originalname.split('.')[1];

        // Indica o novo nome do arquivo:
        cb(null, `${fileName}.${fileExt}`)

    }
})
const upload = multer({ storage })

router.post('/upload', upload.single('post'), (req, res) => {

    prisma.post.create({
        data: {
            content: `http://localhost:3001/uploads/post/${fileName}.${req.file.originalname.split('.')[1]}`,
            userId: req.body.id
        }
    }).then()

    res.end()

})

module.exports = router