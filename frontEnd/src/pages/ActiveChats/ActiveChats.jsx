import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { IoIosAddCircle } from 'react-icons/io'
import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'
import { Main } from '../../components/Main/Main'
import { ModalSearchFriend } from '../../components/ModalSearchFriend/ModalSearchFriend'
import { useConnectAndUpdate } from '../../customHooks/useConnectAndUpdate'
import { AddedFriends } from '../../components/AddedFriends/AddedFriends'

function ActiveChats() {
  const { findUser: findFriend, userFound: found } = useSearchIdByEmail()
  const [openModalSearchFriends, setOpenModalSearchFriends] = useState(false)
  const [inputSearch, setInputSearch] = useState('')
  useConnectAndUpdate(found)

  return (
    <Main>
      <figure className='w-[100px] h-[100px] p-2 absolute top-1 bg-white rounded-full'>
        <img src='/logo.png' alt='logo' className='object-cover' />
      </figure>
      <div className='flex flex-col w-[97%] p-10 gap-3 h-[99%] mt-20  bg-white lg:rounded-ss-3xl lg:rounded-ee-3xl lg:rounded-tr-[100px] rounded-3xl overflow-auto  lg:rounded-bl-[100px] shadow-green-950 shadow-xl  justify-start text-[#37E23B]'>
        <div className='h-[50PX] flex items-center justify-center bg-[#D7FFD7] p-3'>
          <span className='relative h-full flex items-center'>
            <IconContext.Provider value={{ color: '#37E23B', size: '80%' }}>
              <FaSearch />
            </IconContext.Provider>
          </span>
          <input
            type='text'
            placeholder='Buscar por mensaje o usuario'
            className='w-full bg-transparent placeholder:text-[#37E23B] h-full outline-none p-3'
            onChange={(event) => {
              setInputSearch(event.target.value)
            }}
          />
        </div>
        <AddedFriends inputSearch={inputSearch} findFriend={findFriend} />
      </div>
      <button onClick={() => setOpenModalSearchFriends(true)}>
        <IconContext.Provider
          value={{
            color: 'green',
            className: 'absolute bottom-0 right-5 w-[70px] h-[70px]'
          }}>
          <IoIosAddCircle />
        </IconContext.Provider>
      </button>
      <ModalSearchFriend
        openModalSearchFriends={openModalSearchFriends}
        setOpenModalSearchFriends={setOpenModalSearchFriends}
      />
    </Main>
  )
}

export { ActiveChats }
