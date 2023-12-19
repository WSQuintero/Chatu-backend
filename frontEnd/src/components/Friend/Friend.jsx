import { useEffect, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { IconContext } from 'react-icons/lib'
import { useSearchUserByEmail } from '../../customHooks/useSearchUserByEmail'
import { useUpdateInformationUser } from '../../customHooks/useUpdateInformationUser'
import { setUserSstorage } from '../../helpers/setUserSstorage'
import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'
import { useDispatch, useSelector } from 'react-redux'
import { setUserFriends } from '../../redux/userFriendsInformationSlice'
import { openModalChat } from '../../redux/openChatSlice'
import { transformMessages } from '../../helpers/transformMessages'
import { transformFriends } from '../../helpers/transformFriends'
import { updatedInformation } from '../../helpers/updatedInformation'

function Friend({ handleOpenFriendChat, friend }) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const userFriendsInformation = useSelector(
    (state) => state.userFriendsInformation
  )
  const [openDeleteFriendModal, setOpenDeleteFriendModal] = useState(false)
  const { updateDocument } = useUpdateInformationUser()
  const { findUser, userFound } = useSearchUserByEmail()
  const { findUser: findIdUser, userFound: idUserFound } = useSearchIdByEmail()
  const [friendToDelete, setFriendToDelete] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    findUser(currentUser.email)
    findIdUser(currentUser.email)
  }, [])

  const deleteFriend = (event) => {
    findUser(currentUser.email)
    findIdUser(currentUser.email)
    const friendToDelete = event.target.parentNode.parentNode.dataset.email

    dispatch(openModalChat(false))
    setFriendToDelete(friendToDelete)
  }

  useEffect(() => {
    if (userFriendsInformation && friendToDelete && userFound) {
      const actualMessages = transformMessages(userFound)

      const friends =
        transformFriends(userFound)?.filter(
          (fr) => fr.email !== friendToDelete
        ) || []

      const keepInfo = updatedInformation({
        userFound,
        friends,
        actualMessages
      })
      if (friends) {
        updateDocument({
          nameOfCollection: 'users',
          idDocument: idUserFound.id,
          newInformation: keepInfo
        })

        setUserSstorage({
          ...keepInfo,
          isUserAuthenticated: true,
          messages: []
        })
        dispatch(setUserFriends(friends))
      }
    }
  }, [userFound, idUserFound])

  return (
    <article
      key={friend.uid}
      className='h-[50px] flex border border-[#37E23B] text-xs items-center px-5 gap-5 justify-between hover:bg-[#D7FFD7] cursor-pointer'
      onClick={handleOpenFriendChat}
      data-email={friend.email}>
      <img
        src={friend?.perfilPhoto || '/img/no-user.jpg'}
        alt='user image'
        className='h-[90%] object-cover rounded-full'
      />
      <div className='overflow-hidden'>
        <h3 className='font-bold text-md'>{friend.name}</h3>
        <p className='overflow-hidden whitespace-nowrap w-full'>
          {friend.message}
        </p>
      </div>
      <div className='flex items-center gap-3'>
        {openDeleteFriendModal && (
          <button
            onClick={deleteFriend}
            className='border p-1 border-green-500 hover:bg-red-500 hover:text-white rounded-md'>
            Eliminar
          </button>
        )}
        <IconContext.Provider
          value={{
            color: 'green',
            size: '25px',
            className: 'cursor-pointer'
          }}>
          <CiMenuKebab
            onClick={() => setOpenDeleteFriendModal(!openDeleteFriendModal)}
          />
        </IconContext.Provider>
      </div>
    </article>
  )
}

export { Friend }
