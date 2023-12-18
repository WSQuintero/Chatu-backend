import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { IoIosAddCircle } from 'react-icons/io'
import { Main } from '../../components/Main/Main'
import { ModalSearchFriend } from '../../components/ModalSearchFriend/ModalSearchFriend'
import { AddedFriends } from '../../components/AddedFriends/AddedFriends'
import { FaCamera } from 'react-icons/fa'
import { useUploadAndChargeImg } from '../../customHooks/useUploadAndChargeImg'

function ActiveChats() {
  const [openModalSearchFriends, setOpenModalSearchFriends] = useState(false)
  const [inputSearch, setInputSearch] = useState('')
  const { uploadImg, imgUrl } = useUploadAndChargeImg()

  const handleSendImg = (event) => {
    uploadImg(event.target.files[0])
  }

  useEffect(() => {
    if (imgUrl) {
      console.log(imgUrl)
    }
  }, [imgUrl])
  return (
    <Main>
      <figure className='w-[100px] h-[100px]  absolute top-1 bg-white rounded-full object-cover '>
        <div className='w-[100px] h-[100px]  overflow-hidden bg-white rounded-full object-cover'>
          <img
            src={imgUrl || '/logo.png'}
            alt='logo'
            className='object-cover w-full h-full'
          />
          <label htmlFor='fileInput' className='cursor-pointer'>
            <input
              type='file'
              id='fileInput'
              name='fileInput'
              accept='image/*'
              className='bg-transparent hidden'
              onChange={handleSendImg}
            />
            <IconContext.Provider
              value={{
                size: '30px',
                color: 'green',
                className: 'absolute right-0 bottom-0'
              }}>
              <FaCamera />
            </IconContext.Provider>
          </label>
        </div>
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
        <AddedFriends inputSearch={inputSearch} />
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
