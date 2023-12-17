import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Main({ children }) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const isUserAuthenticated = useSelector((state) => state.userAuthenticated)
  const navigate = useNavigate()
  return (
    <>
      {isUserAuthenticated ? (
        <main className='bg-gradient-to-r from-white to-green-500 w-full h-[100vh] relative flex flex-col justify-center items-center'>
          {children}
        </main>
      ) : (
        <div className='h-[100vh] w-full grid place-content-center'>
          <p className='text-green-500 text-3xl m-auto p-5 border-2 border-green-400 font-bold'>
            Usuario no autenticado
          </p>
          <button
            className='h-[30px]  bg-[#37E23B] text-white mt-3 px-10  rounded-xl hover:bg-[#D7FFD7] hover:text-[#37E23B] hover:border hover:border-[#37E23B] '
            onClick={() => {
              navigate('/login')
            }}>
            Ir a inicio de sesión
          </button>
        </div>
      )}
    </>
  )
}

export { Main }
