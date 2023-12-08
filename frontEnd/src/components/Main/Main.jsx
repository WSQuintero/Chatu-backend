import React from 'react'

function Main({ children }) {
  return (
    <main className='bg-gradient-to-r from-white to-green-500 w-full h-[100vh] flex flex-col justify-center items-center'>
      {children}
    </main>
  )
}

export { Main }
