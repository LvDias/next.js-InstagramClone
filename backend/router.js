const express = require('express')
const router = express.Router()
const routerUser = require('./routes/user/router')
const routerPost = require('./routes/post/router')
const routerChat = require('./routes/chat/router')
const routerMessage = require('./routes/message/router')

router.use('/user', routerUser)
router.use('/post', routerPost)
router.use('/chat', routerChat)
router.use('/message', routerMessage)

module.exports = router