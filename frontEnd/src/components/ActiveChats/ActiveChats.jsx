import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Main } from '../Main/Main'
import { IconContext } from 'react-icons/lib'

function ActiveChats() {
  const [inputSearch, setInputSearch] = useState('')
  const [filterInput, setFilterInput] = useState([])
  const [withoutResults, setWithoutResults] = useState(false)

  const messages = [
    { name: 'juan', message: 'hola mamá', img: '/logo.png', userId: 1 },
    { name: 'maría', message: 'hoasfla maasfmá', img: '/logo.png', userId: 2 },
    { name: 'juan', message: 'hola masehasfgamá', img: '/logo.png', userId: 3 },
    { name: 'juan', message: 'hola asfsaf', img: '/logo.png', userId: 4 },
    { name: 'juan', message: 'hola saknoksaf', img: '/logo.png', userId: 5 },
    { name: 'juan', message: 'hola mamá', img: '/logo.png', userId: 6 },
    { name: 'juan', message: 'hola mamá', img: '/logo.png', userId: 7 },
    { name: 'juan', message: 'hola mamá', img: '/logo.png', userId: 8 },
    { name: 'juan', message: 'hola mamá', img: '/logo.png', userId: 9 }
  ]

  useEffect(() => {
    if (inputSearch !== '') {
      const filterMessages = messages.filter((message) => {
        return (
          message.name.includes(String(inputSearch.toLowerCase())) ||
          message.message.includes(String(inputSearch.toLowerCase()))
        )
      })
      setFilterInput(filterMessages)

      if (filterMessages.length === 0) {
        setWithoutResults(true)
      } else {
        setWithoutResults(false)
      }
    }
  }, [inputSearch])

  return (
    <Main>
      <figure className='w-[100px] h-[100px] p-2 absolute top-1 bg-white rounded-full'>
        <img src='/logo.png' alt='logo' className='object-cover' />
      </figure>
      <div className='flex flex-col w-[97%] p-10 gap-3 h-[99%] mt-20  bg-white lg:rounded-ss-3xl lg:rounded-ee-3xl lg:rounded-tr-[100px] rounded-3xl overflow-auto  lg:rounded-bl-[100px] shadow-green-950 shadow-xl  justify-start text-[#37E23B]'>
        <div className='h-[50PX] flex items-center justify-center bg-[#D7FFD7]'>
          <span className='relative h-full flex items-center'>
            <IconContext.Provider value={{ color: '#37E23B', size: '80%' }}>
              <FaSearch />
            </IconContext.Provider>
          </span>
          <input
            type='text'
            placeholder='Buscar por mensaje o usuario'
            className='w-full bg-transparent placeholder:text-[#37E23B] h-full outline-none'
            onChange={(event) => {
              setInputSearch(event.target.value)
            }}
          />
        </div>
        {inputSearch === ''
          ? messages.map((message) => (
              <article
                key={message.userId}
                className='h-[50px] flex border border-[#37E23B] text-xs items-center px-5 gap-5 hover:bg-[#D7FFD7] cursor-pointer'>
                <img
                  src={message.img}
                  alt='user image'
                  className='h-[90%] object-cover rounded-full'
                />
                <div className='overflow-hidden'>
                  <h3 className='font-bold text-md'>{message.name}</h3>
                  <p className='overflow-hidden whitespace-nowrap w-full'>
                    {message.message}
                  </p>
                </div>
              </article>
            ))
          : filterInput.map((message) => (
              <article
                key={message.userId}
                className='h-[50px] flex border border-[#37E23B] text-xs items-center px-5 gap-5 hover:bg-[#D7FFD7]'>
                <img
                  src={message.img}
                  alt='user image'
                  className='h-[90%] object-cover rounded-full'
                />
                <div className='overflow-hidden'>
                  <h3 className='font-bold text-md'>{message.name}</h3>
                  <p className='overflow-hidden whitespace-nowrap w-full'>
                    {message.message}
                  </p>
                </div>
              </article>
            ))}
        {withoutResults && (
          <p className='text-[#37E23B] '>No se encontrarón resultados</p>
        )}
      </div>
    </Main>
  )
}

export { ActiveChats }
