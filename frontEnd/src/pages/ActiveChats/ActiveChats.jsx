import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { IoIosAddCircle } from 'react-icons/io'
import { useUpdateInformationUser } from '../../customHooks/useUpdateInformationUser'
import { useGetIdOfCollection } from '../../customHooks/useGetIdOfCollection'
import { useSearchUserByEmail } from '../../customHooks/useSearchUserByEmail'
import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'
import { IoIosCloseCircle } from 'react-icons/io'
import { socket } from '../../socket/socket'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { openModalChat } from '../../redux/openChatSlice'
import { updateFriendInformation } from '../../redux/friendInformationSlice'
import { Main } from '../../components/Main/Main'
import { addUser } from '../../redux/userSlice'

function ActiveChats() {
  const { updateDocument: updateUser } = useUpdateInformationUser()
  const { actualIdOfCollection } = useGetIdOfCollection()
  const { updateDocument, isOkayUpdate } = useUpdateInformationUser()
  const { findUser: find, userFound: found } = useSearchIdByEmail()
  const { findUser, userFound } = useSearchUserByEmail()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [openModalSearchFriends, setOpenModalSearchFriends] = useState(false)
  const [inputSearch, setInputSearch] = useState('')
  const [filterInput, setFilterInput] = useState([])
  const [friendNoExist, setFriendNoExist] = useState(false)
  const [withoutResults, setWithoutResults] = useState(false)

  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

  const handleGoToChat = (event) => {
    const userEmail = event.target.dataset.email
    find(userEmail)
  }

  const connectToRoom = (idConnection) => {
    socket.on('joinResponse', (response) => {
      if (response.success) {
        console.log(`Usuario unido exitosamente a la sala: ${idConnection}`)
        if (window.innerWidth < 800) {
          navigate('/chat')
        } else {
          dispatch(openModalChat(true))
        }
      } else {
        console.error(`Error al unirse a la sala: ${response.error}`)
      }
    })

    socket.emit('join', {
      id: idConnection,
      sender: currentUser.email
    })
  }
  const updateUserInDb = (friendInformation, idConnection) => {
    if (found?.id) {
      dispatch(updateFriendInformation(friendInformation))

      const friendsOfFriend =
        friendInformation.friends.arrayValue?.values.map((f) => {
          return {
            name: f.mapValue.fields.name.stringValue,
            email: f.mapValue.fields.email.stringValue,
            uid: f.mapValue.fields.uid.stringValue
          }
        }) || []

      const updatedUser = {
        idConnection,
        name: friendInformation.name.stringValue,
        email: friendInformation.email.stringValue,
        uid: friendInformation.uid.stringValue,
        friends: friendsOfFriend
      }

      updateUser({
        nameOfCollection: 'users',
        idDocument: found?.id,
        newInformation: updatedUser
      })
      dispatch(addUser(updatedUser))
    }
  }

  const handleSearchFriend = (event) => {
    event.preventDefault()
    const searchUserByEmail = event.target.elements.searchUserByEmail.value

    findUser(searchUserByEmail)
  }

  const handleAddFriend = () => {
    setOpenModalSearchFriends(true)
  }
  const handleAddListOfFriends = () => {
    if (actualIdOfCollection) {
      const userFriends = currentUser.friends
      const updatedUser = [
        ...userFriends,
        {
          name: userFound.name.stringValue,
          email: userFound.email.stringValue,
          uid: userFound.uid.stringValue
        }
      ]
      const friendFound = userFriends?.some(
        (user) => user.email === userFound.email.stringValue
      )

      if (friendFound) {
        setFriendNoExist(true)
        setTimeout(() => {
          setFriendNoExist(false)
        }, 2000)
      } else {
        const updatedFriends = JSON.stringify({
          ...currentUser,
          friends: updatedUser
        })
        updateDocument({
          nameOfCollection: 'users',
          idDocument: actualIdOfCollection,
          newInformation: {
            ...currentUser,
            friends: updatedUser,
            messages: []
          }
        })

        sessionStorage.setItem('currentUser', updatedFriends)
      }
    }
  }

  useEffect(() => {
    if (found?.id) {
      const friendInformation = found?._document?.data.value.mapValue.fields
      const friendUid = friendInformation.uid.stringValue
      const idConnection = [friendUid, currentUser.uid].sort().join('')

      updateUserInDb(friendInformation, idConnection)
      connectToRoom(idConnection)
    }
  }, [found])

  useEffect(() => {
    if (inputSearch !== '') {
      const userFriends = currentUser.friends
      const filterMessages = userFriends.filter((message) => {
        return message.name.includes(String(inputSearch.toLowerCase()))
        //agregar despues la lógica para buscar por mensaje
      })
      setFilterInput(filterMessages)

      if (filterMessages.length === 0) {
        setWithoutResults(true)
        setTimeout(() => {
          setWithoutResults(false)
        }, 2000)
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
        {inputSearch === ''
          ? currentUser.friends.map((friend) => (
              <article
                key={friend.uid}
                className='h-[50px] flex border border-[#37E23B] text-xs items-center px-5 gap-5 hover:bg-[#D7FFD7] cursor-pointer'
                onClick={handleGoToChat}
                data-email={friend.email}>
                <img
                  src={friend?.img || '/img/no-user.jpg'}
                  alt='user image'
                  className='h-[90%] object-cover rounded-full'
                />
                <div className='overflow-hidden'>
                  <h3 className='font-bold text-md'>{friend.name}</h3>
                  {/* <p className='overflow-hidden whitespace-nowrap w-full'>
                    {friend.message}
                  </p> */}
                </div>
              </article>
            ))
          : filterInput.map((friend) => (
              <article
                key={friend.uid}
                className='h-[50px] flex border border-[#37E23B] text-xs items-center px-5 gap-5 hover:bg-[#D7FFD7] cursor-pointer'
                onClick={handleGoToChat}
                data-email={friend.email}>
                <img
                  src={friend?.img || '/img/no-user.jpg'}
                  alt='user image'
                  className='h-[90%] object-cover rounded-full'
                />
                <div className='overflow-hidden'>
                  <h3 className='font-bold text-md'>{friend.name}</h3>
                  <p className='overflow-hidden whitespace-nowrap w-full'>
                    {friend.message}
                  </p>
                </div>
              </article>
            ))}
        {withoutResults && (
          <p className='text-[#37E23B] '>No se encontrarón resultados</p>
        )}
      </div>
      <button onClick={handleAddFriend}>
        <IconContext.Provider
          value={{
            color: 'green',
            className: 'absolute bottom-0 right-5 w-[70px] h-[70px]'
          }}>
          <IoIosAddCircle />
        </IconContext.Provider>
      </button>
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
          {userFound && (
            <div className='w-full p-5'>
              <article className='flex flex-col sm:flex-row justify-between  border border-[#37E23B] p-4 items-center'>
                <div className='flex gap-3'>
                  <img
                    src={
                      userFound?.img?.stringValue
                        ? userFound?.img?.stringValue
                        : '/img/no-user.jpg'
                    }
                    alt={userFound.name.stringValue}
                    className='w-[60px] h-[60px] rounded-full border-4 border-[#37E23B'
                  />
                  <div>
                    <h3 className='text-[#19581a]'>
                      {userFound.name.stringValue}
                    </h3>
                    <p className='text-[#257726]'>
                      {userFound.email.stringValue}
                    </p>
                  </div>
                </div>
                <button
                  className='w-[78px] h-[80px] bg-[#8ee68f] p-4 rounded-full grid place-content-center font-medium '
                  onClick={handleAddListOfFriends}>
                  Añadir
                </button>
              </article>
              <div className='flex flex-col justify-center items-center'>
                {isOkayUpdate && (
                  <p className='text-blue-600 mt-10 font-bold text-lg'>
                    Has añadido a {userFound?.name.stringValue} a tus amigos{' '}
                  </p>
                )}
                {friendNoExist && (
                  <p className='text-red-600 mt-10 font-bold text-lg'>
                    {userFound?.name.stringValue} ya se encuentra en tus amigos{' '}
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </Main>
  )
}

export { ActiveChats }
