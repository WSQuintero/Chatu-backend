import { useNavigate } from 'react-router'
import { Main } from '../../components/Main/Main'
import { useEffect, useState } from 'react'
import { useAddUser } from '../../customHooks/useAddUser'
import useAddUserInDb from '../../customHooks/useAddUserInDb'
import './SignUp.css'

function SignUp() {
  const { startAddUser, userCredential, errorAddUser } = useAddUser()
  const { sendInformationUser, errorInfoAdded, confirmationInfoAdded } =
    useAddUserInDb()
  const [userInformation, setUserInformation] = useState({})
  const [error, SetError] = useState('')
  const navigate = useNavigate()

  const handleSignUp = (event) => {
    event.preventDefault()
    const SignUpUser = String(event.target.elements.SignUpUser.value)
    const SignUpEmail = String(event.target.elements.SignUpEmail.value)
    const SignUpPassword = String(event.target.elements.SignUpPassword.value)
    const repeatPassword = String(event.target.elements.repeatPassword.value)

    if (SignUpPassword === repeatPassword) {
      setUserInformation({ name: SignUpUser, email: SignUpEmail })
      startAddUser(SignUpEmail, SignUpPassword)
    } else {
      SetError('Las contraseñas deben coincidir')
      setTimeout(() => {
        SetError('')
      }, 2000)
    }
  }

  useEffect(() => {
    switch (errorAddUser?.errorCode) {
      case 'auth/weak-password':
        SetError('La contraseña debe ser mayor a 6 dígitos')
        setTimeout(() => {
          SetError('')
        }, 2000)
        break
      case 'auth/email-already-in-use':
        SetError('EL correo ya se encuentra registrado')
        setTimeout(() => {
          SetError('')
        }, 2000)
        break
    }
  }, [errorAddUser])

  useEffect(() => {
    if (userCredential?.accessToken) {
      sendInformationUser({
        ...userInformation,
        uid: userCredential?.uid
      })
    }
  }, [userCredential])

  useEffect(() => {
    if (confirmationInfoAdded) {
      navigate('/login')
    } else {
      console.log(errorInfoAdded)
    }
  }, [confirmationInfoAdded, errorInfoAdded])

  return (
    <Main>
      <div className='sm:w-3/5 sm:h-4/5 w-[90%] bg-white rounded-3xl shadow-green-950 shadow-xl flex justify-center text-[#37E23B]'>
        <figure className=' h-full w-6/12 relative hidden lg:flex'>
          <img
            src='/img/chica-señalando.jpg '
            alt='chica texteando'
            className='absolute bottom-0  w-full'
          />
        </figure>
        <form
          onSubmit={handleSignUp}
          className='flex flex-col h-full w-full lg:w-5/12 overflow-hidden p-10 items-center gap-5 relative mr-5 '>
          <img src='/logo.png' alt='' className='h-2/6 object-contain ' />
          <h2>Registro de usuario</h2>
          <label
            htmlFor=''
            className='h-1/6 w-full flex items-center gap-3  border-b border-[#37E23B] '>
            <span>
              <img
                src='/user.svg'
                alt='user logo'
                className=' object-cover w-[30px] h-[30px]'
              />
            </span>
            <input
              type='text'
              placeholder='Nombre de usuario'
              required
              className='placeholder:text-[#37E23B] w-full'
              name='SignUpUser'
            />
          </label>
          <label
            htmlFor=''
            className='h-1/6 w-full flex items-center gap-3  border-b border-[#37E23B] '>
            <span>
              <img
                src='/email.svg'
                alt='email logo'
                className=' object-contain w-[30px] h-[30px]'
              />
            </span>
            <input
              type='email'
              placeholder='Correo electrónico'
              required
              className='placeholder:text-[#37E23B] w-full'
              name='SignUpEmail'
            />
          </label>
          <label
            htmlFor=''
            className='h-1/6 w-full flex items-center gap-3  border-b border-[#37E23B]'>
            <span>
              <img
                src='/Password.svg'
                alt='password logo'
                className=' object-cover w-[30px] h-[30px]'
              />
            </span>
            <input
              type='password'
              placeholder='Contraseña'
              required
              className='placeholder:text-[#37E23B] w-full'
              name='SignUpPassword'
            />
          </label>
          <label
            htmlFor=''
            className='h-1/6 w-full flex items-center gap-3  border-b border-[#37E23B]'>
            <span>
              <img
                src='/Password.svg'
                alt='password logo'
                className=' object-cover w-[30px] h-[30px]'
              />
            </span>
            <input
              type='password'
              placeholder='Repetir contraseña'
              required
              className='placeholder:text-[#37E23B] w-full'
              name='repeatPassword'
            />
          </label>
          <div className='relative w-full'></div>
          <button className='  bg-[#37E23B] text-white p-1 px-6  rounded-xl hover:bg-[#D7FFD7] border border-[#37E23B] hover:text-[#37E23B] hover:border hover:border-[#37E23B]  text-xs'>
            Registrar usuario
          </button>
          <span className='text-red-600'>{error}</span>
        </form>
      </div>
    </Main>
  )
}

export { SignUp }
