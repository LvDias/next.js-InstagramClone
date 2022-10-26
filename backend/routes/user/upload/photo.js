const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const multer = require('multer')

const fileName = require('crypto')
            .randomBytes(64)
            .toString('hex');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/photo/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const fileExt = file.originalname.split('.')[1];

        // Indica o novo nome do arquivo:
        cb(null, `${fileName}.${fileExt}`)

    }
})
const upload = multer({ storage })

router.post('/upload', upload.single('photo'), (req, res) => {

    prisma.user.update({
        where: {
            id: req.body.id
        },
        data: {
            photo: `http://localhost:3001/uploads/photo/${fileName}.${req.file.originalname.split('.')[1]}`
        }
    }).then()

    res.end()

})

module.exports = router