import { useEffect, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { IconContext } from 'react-icons/lib'
import { useSearchUserByEmail } from '../../customHooks/useSearchUserByEmail'
import { useUpdateInformationUser } from '../../customHooks/useUpdateInformationUser'
import { setUserSstorage } from '../../helpers/setUserSstorage'
import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'
import { useDispatch } from 'react-redux'
import { setUserFriends } from '../../redux/userFriendsInformationSlice'
import { openModalChat } from '../../redux/openChatSlice'

function Friend({ handleOpenFriendChat, friend }) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const [openDeleteFriendModal, setOpenDeleteFriendModal] = useState(false)
  const { updateDocument, isOkayUpdate, setIsOkayUpdate } =
    useUpdateInformationUser()
  const { findUser, userFound } = useSearchUserByEmail()
  const { findUser:findIdUser, userFound:idUserFound } = useSearchIdByEmail()
  const dispatch=useDispatch()
  useEffect(() => {
    findUser(currentUser.email)
    findIdUser(currentUser.email)
  }, [isOkayUpdate])

  const deleteFriend = (event) => {
    const friendToDelete = event.target.parentNode.parentNode.dataset.email
    const actualMessages = userFound?.messages?.arrayValue?.values
      ? userFound?.messages?.arrayValue?.values.map((mss) => {
          return {
            idConnection: mss.mapValue.fields.idConnection?.stringValue,
            message: mss.mapValue.fields.message?.stringValue,
            sender: mss.mapValue.fields.sender?.stringValue,
            user: mss.mapValue.fields.user?.stringValue
          }
        })
      : []

    const friends =
      userFound?.friends?.arrayValue?.values
        ?.map((fOf) => {
          return {
            email: fOf?.mapValue.fields.email?.stringValue,
            name: fOf?.mapValue.fields.name?.stringValue,
            uid: fOf?.mapValue.fields.uid?.stringValue
          }
        })
        .filter((fr) => fr.email !== friendToDelete) || []

    const informationUserWithoutDeleteFriend = {
      email: userFound?.email?.stringValue,
      friends: friends,
      idConnection: userFound?.idConnection?.stringValue,
      messages: actualMessages,
      name: userFound?.name?.stringValue,
      uid: userFound?.uid?.stringValue
    }

    updateDocument({
      nameOfCollection:"users",
      idDocument:idUserFound.id,
      newInformation:informationUserWithoutDeleteFriend
    })

    setUserSstorage({
      ...informationUserWithoutDeleteFriend,
      isUserAuthenticated: true,
      messages: []
    })   

    dispatch(setUserFriends(friends))
    dispatch(openModalChat(false))
  }
  return (
    <article
      key={friend.uid}
      className='h-[50px] flex border border-[#37E23B] text-xs items-center px-5 gap-5 justify-between hover:bg-[#D7FFD7] cursor-pointer'
      onClick={handleOpenFriendChat}
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
      <div className='flex'>
        {openDeleteFriendModal && (
          <button onClick={deleteFriend}>Eliminar</button>
        )}
        <IconContext.Provider
          value={{
            color: 'green',
            size: '20px',
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
