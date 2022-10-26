import { useEffect } from 'react'

import Nav from '../components/includes/nav'

import api from '../components/axios/api'

export default function Index(props){

  useEffect(() => {

    if(props.user.photo){
      document.getElementById('icon-upload-photo').classList.add('opacity-0')
      document.getElementById('show-photo').style = `background-image: url('${props.user.photo}')`
    }

  }, [])

  const uploadPhoto = (e) => {

    const file = URL.createObjectURL(e.target.files[0])

    api({
      method: 'post',
      url: '/user/create/upload',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: {
        photo: e.target.files[0],
        id: props.user.id
      }
    })

    if(file){

      document.getElementById('icon-upload-photo').classList.add('opacity-0')
      document.getElementById('show-photo').style = `background-image: url('${file}')`

    }

  }

  return(

    <div className='min-h-screen h-full flex gap-24 bg-slate-50'>

      <Nav user={props.user} />

      <div className='flex justify-center gap-12 w-full'>

        <div className='flex-none w-2/5 flex flex-col gap-3 mt-6 mb-6'>

          <div className='flex flex-col gap-3'>

            {

              props.posts.map((e) => {

                if(e){

                  return(

                    <div key={e.id} className='flex flex-col'>

                      <div className='border border-gray-300 bg-white p-3 rounded-tl rounded-tr'>

                        <div className='flex items-center gap-3'>

                          <div className='relative rounded-full w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500'> 

                            {

                              (() => {

                                if(e.user.photo){
                                  return(

                                    <div className='absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 rounded-full bg-white bg-center bg-cover' style={{ width: '92%', height: '92%', backgroundImage: `url('${e.user.photo}')` }} />
                                    
                                  )
                                }else{

                                  return(

                                    <div className='absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 rounded-full bg-white bg-center bg-cover' style={{ width: '92%', height: '92%', backgroundImage: `url('https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png')` }} />

                                  )

                                }

                              })()

                            }

                          </div>
                          <p className='text-sm font-medium'>{ e.user.username }</p>

                        </div>

                      </div>

                      <div style={{ backgroundImage: `url(${e.content})` }} className='aspect-square bg-center bg-cover' />

                    </div>

                  )

                }

              })

            }

          </div>

        </div>

        <div className='flex flex-col gap-6 flex-initial m-6 w-96'>

          <div className='flex gap-6 items-center'>

            <div id='show-photo' className='relative rounded-full w-14 h-14 bg-white bg-center bg-cover'>

              <i id='icon-upload-photo' className='bi bi-upload absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2' />
              <input onChange={uploadPhoto} id='upload-photo' type='file' name='photo' accept='image/*' className='absolute top-0 left-0 rounded-full w-full h-full opacity-0' />

            </div>
            
            <div className='flex flex-col'>

              <p className='text-sm font-medium'>{ props.user.username }</p>
              <p className='text-xs text-slate-500'>{ props.user.fullName }</p>

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

  const infoPostsJson = await api({
    method: 'get',
    url: '/post/search',
    headers: {
      cookie: ctx.req.headers.cookie
    }
  })

  const infoPosts = await infoPostsJson.data
  const posts = infoPosts

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
        posts
      }
  
    }

  }

}