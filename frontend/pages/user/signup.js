import { useRouter } from 'next/router'
import api from '../../components/axios/api'

export default function Signup(){

    const router = useRouter()

    const changePage = () => {

        router.push('/user/login', '/', { shallow: true })

    }

    const checkEmailOrPhone = (e) => {

        const checkEmail = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)
        const checkPhone = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)

        switch(checkEmail.test(e.target.value)){

            case true: 

                api({
                    method: 'post',
                    url: '/user/search/email',
                    data: {
                        email: e.target.value
                    }
                }).then((findEmail) => {

                    if(findEmail.data){
                        
                        document.getElementById('emailOrPhoneFalse').classList.remove('hidden')
                        document.getElementById('emailOrPhoneTrue').classList.add('hidden')
                        e.target.setAttribute('status', 'false')

                    }else{
                        
                        document.getElementById('emailOrPhoneTrue').classList.remove('hidden')
                        document.getElementById('emailOrPhoneFalse').classList.add('hidden')
                        e.target.setAttribute('status', 'true')

                    }

                })

                    break

            default:
                
                document.getElementById('emailOrPhoneFalse').classList.remove('hidden')
                document.getElementById('emailOrPhoneTrue').classList.add('hidden')
                e.target.setAttribute('status', 'false')

        }

        switch(checkPhone.test(e.target.value)){

            case true: 

                api({
                    method: 'post',
                    url: '/user/search/phone',
                    data: {
                        phone: e.target.value
                    }
                }).then((findPhone) => {

                    if(findPhone.data){
                        
                        document.getElementById('emailOrPhoneFalse').classList.remove('hidden')
                        document.getElementById('emailOrPhoneTrue').classList.add('hidden')
                        e.target.setAttribute('status', 'false')

                    }else{
                        
                        document.getElementById('emailOrPhoneTrue').classList.remove('hidden')
                        document.getElementById('emailOrPhoneFalse').classList.add('hidden')
                        e.target.setAttribute('status', 'true')

                    }

                })

                    break

            default:
                
                document.getElementById('emailOrPhoneFalse').classList.remove('hidden')
                document.getElementById('emailOrPhoneTrue').classList.add('hidden')
                e.target.setAttribute('status', 'false')

        }

    }

    const checkUsername = (e) => {

        e.target.value = e.target.value.replace(/ /g, '_')
        const checkUsername = new RegExp(/(?:^|[^\w])(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/)

        switch(checkUsername.test(`@${e.target.value}`)){

            case true: 

                api({
                    method: 'post',
                    url: '/user/search/username',
                    data: {
                        username: e.target.value
                    }
                }).then((findUsername) => {

                    if(findUsername.data){

                        document.getElementById('usernameFalse').classList.remove('hidden')
                        document.getElementById('usernameTrue').classList.add('hidden')
                        e.target.setAttribute('status', 'false')

                    }else{

                        document.getElementById('usernameTrue').classList.remove('hidden')
                        document.getElementById('usernameFalse').classList.add('hidden')
                        e.target.setAttribute('status', 'true')

                    }

                })

                    break

            default:
                
                document.getElementById('usernameFalse').classList.remove('hidden')
                document.getElementById('usernameTrue').classList.add('hidden')
                e.target.setAttribute('status', 'false')

        }

    }

    const unlockButton = (e) => {

        if(e.target.getAttribute('id') === 'fullName' || e.target.getAttribute('id') === 'password'){

            e.target.value ? e.target.setAttribute('status', 'true') : e.target.setAttribute('status', 'false')

        }
        
        const emailOrPhone = document.getElementById('emailOrPhone').getAttribute('status')
        const fullName = document.getElementById('fullName').getAttribute('status')
        const username = document.getElementById('username').getAttribute('status')
        const password = document.getElementById('password').getAttribute('status')

        if(emailOrPhone == 'true' && fullName == 'true' && username == 'true' && password == 'true'){

            document.getElementById('button-signup').removeAttribute('disabled')
            document.getElementById('button-signup').classList.remove('opacity-40')

        }else{

            document.getElementById('button-signup').setAttribute('disabled', 'true')
            document.getElementById('button-signup').classList.add('opacity-40')

        }

    }

    return(

        <div className='h-screen flex items-center justify-center gap-24 bg-slate-50'>

            <div className='flex flex-col gap-6'>

                <div className='flex flex-col gap-12 border border-gray-300 bg-white p-12 justify-center items-center'>

                <img src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png' />

                <form className='flex flex-col gap-6' action={`${process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://meusite.com'}/user/create/`} method='post'>

                    <div className='flex flex-col gap-1'>

                        <div className='relative'>

                            <input id='emailOrPhone' status='false' onBlur={unlockButton} onChange={checkEmailOrPhone} name='emailOrPhone' className='info-input w-64 border border-gray-300 p-2.5 bg-gray-50 rounded-sm placeholder:text-xs text-xs' type='text' placeholder='Phone number or e-mail' required />
                            <i id='emailOrPhoneTrue' className="hidden bi bi-check-circle-fill absolute right-2.5 bottom-1/2 translate-y-2/4 text-lime-500" />
                            <i id='emailOrPhoneFalse' className="hidden bi bi-x-circle-fill absolute right-2.5 bottom-1/2 translate-y-2/4 text-red-600" />

                        </div>

                        <input id='fullName' status='false' onBlur={unlockButton} name='fullName' className='info-input w-64 border border-gray-300 p-2.5 bg-gray-50 rounded-sm placeholder:text-xs text-xs' type='text' placeholder='Full name' required />

                        <div className='relative'>

                            <input id='username' status='false' onBlur={unlockButton} onChange={checkUsername} name='username' className='info-input w-64 border border-gray-300 p-2.5 bg-gray-50 rounded-sm placeholder:text-xs text-xs' type='text' placeholder='Username' required />
                            <i id='usernameTrue' className="hidden bi bi-check-circle-fill absolute right-2.5 bottom-1/2 translate-y-2/4 text-lime-500" />
                            <i id='usernameFalse' className="hidden bi bi-x-circle-fill absolute right-2.5 bottom-1/2 translate-y-2/4 text-red-600" />

                        </div>

                        <input id='password' status='false' onBlur={unlockButton} name='password' className='info-input w-64 border border-gray-300 p-2.5 bg-gray-50 rounded-sm placeholder:text-xs text-xs' type='password' placeholder='Password' required />

                    </div>

                    <div className='flex flex-col gap-3'>

                        <p className='text-gray-600 text-xs w-64 text-center'>As pessoas que usam nosso serviço podem ter carregado suas informações de contato no Instagram. <span className='font-semibold'>Saiba mais</span></p>

                        <p className='text-gray-600 text-xs w-64 text-center'>Ao se cadastrar, você concorda com nossos <span className='font-semibold'>Termos</span>, <span className='font-semibold'>Política de Privacidade</span> e <span className='font-semibold'>Política de Cookies</span>.</p>

                    </div>

                    <input type='hidden' value={`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://meusite.com'}`} name='redirect' />

                    <button id='button-signup' disabled className='opacity-40 w-64 bg-cyan-500 text-white p-2.5 rounded-sm text-sm'>Cadastrar-se</button>

                </form>

                </div>

                <div className='border border-gray-300 bg-white p-6'>

                    <p className='text-center text-sm'>Tem uma conta? <a className='text-sky-500 font-semibold cursor-pointer' onClick={changePage}>Conecte-se</a></p>

                </div>

            </div>

        </div>

    )

}