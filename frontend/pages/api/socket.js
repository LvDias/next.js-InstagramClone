import { Server } from 'socket.io'
import api from '../../components/axios/api'

export default function socket(req, res){

    if (res.socket.server.io) {
      
        console.log('Socket is already running')

    } else {
      
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
          
            socket.on('room', room => {

                api({
                    method: 'post',
                    url: '/chat/search',
                    data: {
                        user_me: room.user_me,
                        user_for: room.user_for
                    }
                }).then((chat) => {


                    if(chat.data){

                        socket.join(chat.data.id)

                    }else{

                        api({
                            method: 'post',
                            url: '/chat/create',
                            data: {
                                user_me: room.user_me,
                                user_for: room.user_for
                            }
                        }).then((cChat) => {
        
                            socket.join(cChat.data.id)
        
                        })

                    }

                })

            })

            socket.on('message', msg => {

                api({
                    method: 'post',
                    url: '/chat/search',
                    data: {
                        user_me: msg.user.user_me,
                        user_for: msg.user.user_for
                    }
                }).then((chat) => {

                    socket.to(chat.data.id).emit('message', msg.message)

                    api({
                        method: 'post',
                        url: '/message/create',
                        data: {
                            content: msg.message,
                            chatId: chat.data.id,
                            userId: msg.user.user_me
                        }
                    })

                })

            })

        })

    }

    res.end()

}