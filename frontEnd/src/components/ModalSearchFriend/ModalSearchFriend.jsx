import { FaSearch } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'
import { IconContext } from 'react-icons/lib'
import { useSearchUserByEmail } from '../../customHooks/useSearchUserByEmail'
import { FoundFriend } from '../FoundFriend/FoundFriend'
import { useEffect } from 'react'
import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'

function ModalSearchFriend({
  openModalSearchFriends,
  setOpenModalSearchFriends
}) {
  const { findUser, userFound, setUserFound } = useSearchUserByEmail()

  const handleSearchFriend = (event) => {
    event.preventDefault()
    const searchUserByEmail = event.target.elements.searchUserByEmail.value

    setUserFound(undefined)
    findUser(searchUserByEmail)
  }



  return (
    <>
      {openModalSearchFriends && (
        <section className='w-full h-full absolute bg-white '>
          <button onClick={() => setOpenModalSearchFriends(false)}>
            <IconContext.Provider
              value={{
                color: 'green',
                className: 'w-[50px] h-[50px] absolute right-5 top-6'
              }}>
              <IoIosCloseCircle />
            </IconContext.Provider>
          </button>
          <form
            action=''
            onSubmit={handleSearchFriend}
            className='flex flex-col items-center'>
            <div className='h-[50PX] w-[80%] flex items-center justify-center bg-[#D7FFD7]'>
              <span className='relative h-full flex items-center p-3 text-[#37E23B]'>
                <IconContext.Provider value={{ color: '#37E23B', size: '80%' }}>
                  <FaSearch />
                </IconContext.Provider>
              </span>
              <input
                type='email'
                placeholder='Buscar usuario por email'
                className=' bg-transparent placeholder:text-[#37E23B] h-full outline-none text-[#19581a] font-md '
                name='searchUserByEmail'
              />
            </div>
            <button className='bg-[#37E23B] px-5 py-2 rounded-2xl mt-4 text-white font-bold hover:bg-[#D7FFD7] hover:text-[#37E23B] hover:border hover:border-[#37E23B]'>
              Buscar
            </button>
          </form>
          <FoundFriend userFound={userFound} />
        </section>
      )}
    </>
  )
}

export { ModalSearchFriend }
