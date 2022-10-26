import { useRouter } from 'next/router'
import Link from 'next/link'

import api from '../axios/api'
import { useEffect } from 'react'

export default function Nav(props){

    const showAddPost = () => {

        document.getElementById('add-post').classList.remove('hidden')

    }

    const closeAddPost = () => {

        document.getElementById('add-post').classList.add('hidden')

    }

    const uploadPost = (e) => {

        api({
            method: 'post',
            url: '/post/create/upload',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                post: e.target.files[0],
                id: props.user.id
            }
        })

        document.getElementById('add-post').classList.add('hidden')

        document.getElementById('success-post').classList.remove('hidden')

        setInterval(() => {
            document.getElementById('success-post').classList.add('hidden')
        
            window.location.reload(true)
        }, 3000)

    }

    const router = useRouter()

    useEffect(() => {

        switch(router.pathname){

            case '/': 
        
                document.getElementById('icon-house').classList.remove('bi-house')
                document.getElementById('icon-house').classList.add('bi-house-fill')

                document.getElementById('icon-chat').classList.remove('bi-chat-dots-fill')
                document.getElementById('icon-chat').classList.add('bi-chat-dots')
        
                    break
        
            case '/direct/inbox':

                document.getElementById('icon-house').classList.add('bi-house')
                document.getElementById('icon-house').classList.remove('bi-house-fill')
        
                document.getElementById('icon-chat').classList.remove('bi-chat-dots')
                document.getElementById('icon-chat').classList.add('bi-chat-dots-fill')

                document.getElementById('add-post-nav').classList.add('hidden')

                    break
    
        }

    }, [])

    return(

        <>

            <div className='w-64' />

            <div className='fixed left-0 top-0 h-full flex flex-col border-r border-r-gray-300 bg-white px-6 py-10 justify-between w-64'>

                <div className='flex flex-col gap-10'>

                    <a href=''><img className='w-24' src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png' /></a>

                    <div className='flex flex-col gap-5'>

                        <Link href='/'>

                            <a>

                                <div className='flex items-center gap-3'>

                                    <i id='icon-house' className='bi bi-house text-2xl' />
                                    <p id='text-house' className='text-base mt-1'>Página inicial</p>

                                </div>

                            </a>

                        </Link>

                        <Link href='/direct/inbox'>

                            <a>

                                <div className='flex items-center gap-3'>

                                    <i id='icon-chat' className='bi bi-chat-dots text-2xl' />
                                    <p id='text-chat' className='text-base'>Mensagens</p>

                                </div>

                            </a>

                        </Link>

                        <div id='add-post-nav' className='flex items-center gap-3 cursor-pointer' onClick={showAddPost}>

                            <i className='bi bi-plus-circle text-2xl' />
                            <p className='text-base'>Criar</p>

                        </div>

                    </div>

                </div>

            </div>

            <div id='add-post' className='hidden fixed aspect-square w-1/3 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 z-20 border-2 border-black'>

                <div className='flex flex-col absolute bg-white w-full h-full'>

                    <div className='flex items-center justify-between w-full px-5 py-2.5 border-b border-gray-200'>

                        <i onClick={closeAddPost} className='bi bi-arrow-left text-2xl cursor-pointer' />

                    </div>

                    <div id='show-post' className='relative h-full flex items-center justify-center bg-center bg-cover'>

                        <i id='icon-upload-post' className='bi bi-images text-5xl' />
                        <input onChange={uploadPost} id='upload-post' type='file' name='post' accept='image/*' className='absolute top-0 left-0 w-full h-full opacity-0' />

                    </div>

                </div>

            </div>

            <div id='success-post' className='hidden fixed bottom-5 right-1/2 translate-x-1/2 bg-green-500 text-white p-5'>POST ENVIADO!</div>

        </>

    )

}