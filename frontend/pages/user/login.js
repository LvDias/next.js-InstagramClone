import { useRouter } from 'next/router'

export default function Login(){

  const router = useRouter()

  const changePage = () => {

    router.push('/user/signup', '/', { shallow: true })

  }

  const unlockButton = (e) => {

    if(e.target.getAttribute('id') === 'username' || e.target.getAttribute('id') === 'password'){

        e.target.value ? e.target.setAttribute('status', 'true') : e.target.setAttribute('status', 'false')

    }
    
    const username = document.getElementById('username').getAttribute('status')
    const password = document.getElementById('password').getAttribute('status')

    if(username == 'true' && password == 'true'){

        document.getElementById('button-login').removeAttribute('disabled')
        document.getElementById('button-login').classList.remove('opacity-40')

    }else{

        document.getElementById('button-login').setAttribute('disabled', 'true')
        document.getElementById('button-login').classList.add('opacity-40')

    }

}

  return(

    <div className='h-screen flex items-center justify-center gap-24 bg-slate-50'>

      <div className='flex flex-col gap-6'>

        <div className='flex flex-col gap-12 border border-gray-300 bg-white p-12 justify-center items-center'>

          <img src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png' />

          <form className='flex flex-col gap-3' action={`${process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://meusite.com'}/user/login`} method='post'>

            <div className='flex flex-col gap-1'>

                <input onBlur={unlockButton} status='false' id='username' name='username' className='w-64 border border-gray-300 p-2.5 bg-gray-50 rounded-sm placeholder:text-xs text-xs' type='text' placeholder='Phone number, username, or e-mail' required />
                <input onBlur={unlockButton} status='false' id='password' name='password' className='w-64 border border-gray-300 p-2.5 bg-gray-50 rounded-sm placeholder:text-xs text-xs' type='password' placeholder='Password' required />
                <input type='hidden' name='redirect' value={`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://meusite.com'}`} />

            </div>

            <button id='button-login' disabled className='opacity-40 w-64 bg-cyan-500 text-white p-2.5 rounded-sm text-sm'>Entrar</button>

          </form>

        </div>

        <div className='border border-gray-300 bg-white p-6'>

          <p className='text-center text-sm'>Não tem uma conta? <a className='text-sky-500 font-semibold cursor-pointer' onClick={changePage}>Cadastre-se</a></p>

        </div>

      </div>

    </div>

  )

}