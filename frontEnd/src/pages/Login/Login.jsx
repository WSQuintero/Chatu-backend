import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { addUser } from '../../redux/userSlice'
import { useNavigate } from 'react-router'
import { useAccessUser } from '../../customHooks/useAccessUser'
import { useReadUserInDb } from '../../customHooks/useReadUserInDb'
import { updateActualUser, verifyAuthentication } from './helpersLogin'
import './Login.css'
import { setIsUserAuthenticated } from '../../redux/userAtuhenticated'
import { setUserSstorage } from '../../helpers/setUserSstorage'

function Login() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const [error, SetError] = useState('')
  const isUserAuthenticated = useSelector((state) => state.userAuthenticated)
  const { readUserInDb, foundUser } = useReadUserInDb()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { startAccessUser, userAuthenticated, errorUserAuthenticated } =
    useAccessUser()

  const handleLogin = (event) => {
    event.preventDefault()
    const loginEmail = event.target.elements.loginEmail.value
    const loginPassword = event.target.elements.loginPassword.value
    startAccessUser(loginEmail, loginPassword)
  }

  useEffect(() => {
    dispatch(setIsUserAuthenticated(false))
    setUserSstorage({ ...currentUser, isUserAuthenticated: false })
  }, [])
  useEffect(() => {
    verifyAuthentication({
      userAuthenticated,
      SetError,
      errorUserAuthenticated,
      readUserInDb
    })
  }, [userAuthenticated, errorUserAuthenticated])

  useEffect(() => {
    updateActualUser({
      foundUser,
      dispatch,
      navigate,
      addUser,
      isUserAuthenticated
    })
  }, [foundUser])

  return (
    <main className='bg-gradient-to-r from-white to-green-500 w-full h-[100vh] relative flex flex-col justify-center items-center'>
      <div className='sm:w-3/5 sm:h-4/5 w-[80%] h-5/6 bg-white rounded-3xl shadow-green-950 shadow-xl flex justify-center text-[#37E23B]'>
        <figure className=' h-full w-6/12 relative hidden lg:flex'>
          <img
            src='/img/chica-texteando.jpg '
            alt='chica texteando'
            className='absolute bottom-0  w-full'
          />
        </figure>
        <form
          onSubmit={handleLogin}
          className='flex flex-col h-full w-full lg:w-5/12 overflow-hidden p-5 items-center gap-5 relative mr-5 '>
          <img src='/logo.png' alt='' className='h-2/6 object-contain ' />
          <h2>Inicio de sesión</h2>
          <label
            htmlFor=''
            className='h-1/6 w-full flex items-center gap-3  border-b border-[#37E23B] '>
            <span>
              <img
                src='/email.svg'
                alt='email logo'
                className=' object-cover w-[30px] h-[30px]'
              />
            </span>
            <input
              type='email'
              placeholder='Correo electrónico'
              required
              className='placeholder:text-[#37E23B] w-full'
              name='loginEmail'
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
              name='loginPassword'
            />
          </label>
          <div className='relative w-full'>
            <span className='h-1/6 absolute right-0 text-sm without'>
              <a href='/sign-up'>¿No tienes cuenta aún?</a>
            </span>
          </div>
          <button className='h-[30px]  bg-[#37E23B] text-white mt-3 px-10  rounded-xl hover:bg-[#D7FFD7] hover:text-[#37E23B] hover:border hover:border-[#37E23B] '>
            Iniciar sesión
          </button>
          <span className='text-red-600 text-center'>{error}</span>
        </form>
      </div>
    </main>
  )
}

export { Login }
