import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'
import { useConnectAndUpdate } from '../../customHooks/useConnectAndUpdate'
import { useSearchUserByInput } from '../../customHooks/useSearchUserByInput'
import { useGetInformationUser } from '../../customHooks/useGetInformationUser'
import { useUpdateExistMessages } from '../../customHooks/useUpdateExistMessages'
import { Friend } from '../Friend/Friend'

function AddedFriends({ inputSearch }) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const { findUser: findFriend, userFound: foundFriend } = useSearchIdByEmail()
  const { saveInformationUser } = useGetInformationUser(currentUser)
  const { updateMessagesInDb } = useUpdateExistMessages()
  const { filterInput, withoutResults } = useSearchUserByInput(
    inputSearch,
    currentUser
  )
  useConnectAndUpdate(foundFriend)

  const handleOpenFriendChat = (event) => {
    updateMessagesInDb(saveInformationUser)
    findFriend(event.target.dataset.email)
  }

  return (
    <>
      {inputSearch === ''
        ? currentUser.friends.map((friend) => (
            <Friend
              handleOpenFriendChat={handleOpenFriendChat}
              friend={friend}
              key={friend.uid}
            />
          ))
        : filterInput.map((friend) => (
            <Friend
              handleOpenFriendChat={handleOpenFriendChat}
              friend={friend}
              key={friend.uid}
            />
          ))}
      {withoutResults && (
        <p className='text-[#37E23B] '>No se encontrarón resultados</p>
      )}
    </>
  )
}

export { AddedFriends }
