import Nav from '../../components/includes/nav'

import api from '../../components/axios/api'

import io from 'socket.io-client'
let socket

export default function Inbox(props){

    const startChat = async (id, photo, username, e) => {

        if(document.getElementById(id).getAttribute('status') === 'false'){

            function removeAllChildNodes(parent) {
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild)
                }
            }
            const container = document.querySelector('#place-messages')
            removeAllChildNodes(container)

            for(let x = 0; x < document.getElementsByClassName('start-chat').length; x++){

                document.getElementsByClassName('start-chat')[x].setAttribute('status', 'false')

            }

            document.getElementById(id).setAttribute('status', 'true')

            document.getElementById('off-show').classList.add('hidden')
            document.getElementById('on-show').classList.remove('hidden')

            await fetch('/api/socket')
            socket = io()
        
            socket.on('connect', () => {
                console.log('connected')
            })

            socket.emit('room', {
                user_me: props.user.id,
                user_for: id
            })

            api({
                method: 'post',
                url: '/chat/search',
                data: {
                    user_me: props.user.id,
                    user_for: id
                }
            }).then((chat) => {

                if(chat.data){

                    api({
                        method: 'post',
                        url: '/message/search',
                        data: {
                            chatId: chat.data.id
                        }
                    }).then((messages) => {
            
                        messages.data.map((msg) => {
    
                            if(msg.userId == props.user.id){
    
                                const user_me = document.createElement('p')
                                user_me.classList.add('text-end')
                                user_me.textContent = msg.content
                                document.getElementById('place-messages').appendChild(user_me)
    
                            }else{
    
                                const user_for = document.createElement('p')    
                                user_for.textContent = msg.content
                                document.getElementById('place-messages').appendChild(user_for)
    
                            }
    
                        })
            
                    })

                }

            })

            photo ? document.getElementById('photo-for_user').style = `background-image: url('${photo}')` : document.getElementById('photo-for_user').style = `background-image: url('https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png')`
            document.getElementById('username-for_user').textContent = username
            document.getElementById('user_for').value = id

            socket.on('message', msg => {

                const user_for = document.createElement('p')    
                user_for.textContent = msg
                document.getElementById('place-messages').appendChild(user_for)

            })

        }

    }

    const sendMessage = () => {

        const message = document.getElementById('input-message').value
        const id = document.getElementById('user_for').value

        socket.emit('message', {
            message: message,
            user: {
                user_me: props.user.id,
                user_for: id
            }
        })

        const user_me = document.createElement('p')
        user_me.classList.add('text-end')
        user_me.textContent = message
        document.getElementById('place-messages').appendChild(user_me)    
        document.getElementById('input-message').value = ''

    }

    return(

        <div className='flex gap-11'>

            <Nav />

            <div className='flex w-full h-screen p-5 justify-center'>

                <div className='flex border border-gray-300 rounded w-2/3 h-full'>

                    <div className='flex flex-col w-1/3'>

                        <div className='border-b border-r border-b-gray-300 border-r-gray-300 p-5'>

                            <p className='text-center text-sm'>{ props.user.username }</p>

                        </div>

                        <div className='flex flex-col border-r border-r-gray-300 h-full py-2.5'>

                            {

                                props.users.map((user) => {

                                    if(user.id !== props.user.id){

                                        if(user.photo){

                                            return(

                                                <div onClick={() => startChat(user.id, user.photo, user.username)} status='false' id={ user.id } key={user.id} className='start-chat flex items-center gap-5 hover:bg-gray-50 cursor-pointer ease-in duration-200 px-5 py-2.5'>
        
                                                    <div className='rounded-full w-16 h-16 bg-center bg-cover' style={{ backgroundImage: `url(${user.photo})` }} />
        
                                                    <p>{ user.username }</p>
        
                                                </div>
        
                                            )

                                        }else{

                                            return(

                                                <div onClick={() => startChat(user.id, user.photo, user.username)} status='false' id={ user.id } key={ user.id } className='start-chat flex items-center gap-5 hover:bg-gray-50 cursor-pointer ease-in duration-200 px-5 py-2.5'>
        
                                                    <div className='rounded-full w-16 h-16 bg-center bg-cover' style={{ backgroundImage: `url(https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png)` }} />
        
                                                    <p>{ user.username }</p>
        
                                                </div>
        
                                            )

                                        }

                                    }

                                })

                            }

                        </div>

                    </div>

                    <div className='flex w-2/3'>

                        <div id='off-show' className='flex flex-col justify-center items-center w-full gap-5'>

                            <div className='flex items-center justify-center border-2 border-black rounded-full p-5'>

                                <i className='bi bi-send text-7xl mr-2 mt-1' />

                            </div>

                            <h3 className='font-light text-xl'>Suas mensagens</h3>

                        </div>

                        <div id='on-show' className='hidden flex flex-col gap-2.5 w-full'>

                            <div className='flex border-b border-b-gray-300 py-5'>

                                <div className='flex px-5 gap-5'>

                                    <div id='photo-for_user' className='w-5 h-5 rounded-full bg-cover bg-center' />

                                    <p id='username-for_user' className='text-sm'></p>

                                </div>

                            </div>

                            <div className='flex flex-col h-full'>

                                <div id='place-messages' className='flex flex-col p-5 h-full' />

                                <div className='w-full'>

                                    <input id='input-message' className='border border-black w-2/3 p-2' type='text' placeholder='Enviar mensagem...' />
                                    <input id='user_me' type='hidden' value={props.user.id} />
                                    <input id='user_for' type='hidden' />
                                    <button onClick={sendMessage} className='border border-black w-1/3 p-2'>Enviar</button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export async function getServerSideProps(ctx){

    const infoUserJson = await api({
        method: 'get',
        url: '/user/info',
        headers: {
          cookie: ctx.req.headers.cookie
        }
      })
    
      const infoUser = await infoUserJson.data
      const user = JSON.parse(infoUser)

      const infoAllUserJson = await api({
        method: 'get',
        url: '/user/search/all',
        headers: {
          cookie: ctx.req.headers.cookie
        }
      })
    
      const users = await infoAllUserJson.data
    
      if(!user){
    
        return {
          redirect: {
            destination: '/user/login',
            permanent: false,
          },
        }
    
      }else{
    
        return {
    
          props: {
            user,
            users
          }
      
        }
    
      }

}