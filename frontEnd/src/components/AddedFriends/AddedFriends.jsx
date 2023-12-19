import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'
import { useConnectAndUpdate } from '../../customHooks/useConnectAndUpdate'
import { useSearchUserByInput } from '../../customHooks/useSearchUserByInput'
import { useGetInformationUser } from '../../customHooks/useGetInformationUser'
import { useUpdateExistMessages } from '../../customHooks/useUpdateExistMessages'
import { Friend } from '../Friend/Friend'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { SelectFriendsUserInformation } from '../SelectFriendsUserInformation/SelectFriendsUserInformation'
import { setUserFriends } from '../../redux/userFriendsInformationSlice'
import { transformFriends } from '../../helpers/transformFriends'

function AddedFriends({ inputSearch }) {
  const userFriends = useSelector((state) => state.userFriendsInformation)
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const { findUser: findFriend, userFound: foundFriend } = useSearchIdByEmail()
  const { saveInformationUser } = useGetInformationUser(currentUser)
  const { updateMessagesInDb } = useUpdateExistMessages()
  const { filterInput, withoutResults } = useSearchUserByInput(
    inputSearch,
    currentUser
  )
  useConnectAndUpdate(foundFriend)
  const [emailFriend, setEmailFriend] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (emailFriend) {
      const friends = transformFriends(foundFriend)
      findFriend(emailFriend)
      dispatch(setUserFriends(friends))
    }
  }, [emailFriend])

  const handleOpenFriendChat = (event) => {
    updateMessagesInDb(saveInformationUser)
    findFriend(event.target.dataset.email)
    setEmailFriend(event.target.dataset.email)
  }

  return (
    <>
      {inputSearch === '' ? (
        <SelectFriendsUserInformation
          userFriends={userFriends}
          currentUser={currentUser}
          handleOpenFriendChat={handleOpenFriendChat}
        />
      ) : (
        filterInput.map((friend) => (
          <Friend
            handleOpenFriendChat={handleOpenFriendChat}
            friend={friend}
            key={friend.uid}
          />
        ))
      )}
      {withoutResults && (
        <p className='text-[#37E23B] '>No se encontrarón resultados</p>
      )}
    </>
  )
}

export { AddedFriends }
