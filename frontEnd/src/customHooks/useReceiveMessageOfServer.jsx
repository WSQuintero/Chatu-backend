import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket/socket'
import { updateMessages } from '../redux/messageSlice'
import { useSearchUserByEmail } from './useSearchUserByEmail'
import { useUpdateMessagesInFirestore } from './useUpdateMessagesInFirestore'
import { useSearchIdByEmail } from './useSearchIdByEmail'
import { useUpdateInformationUser } from './useUpdateInformationUser'
import { transformMessages } from '../helpers/transformMessages'
import { updatedInformation } from '../helpers/updatedInformation'
import { transformFriends } from '../helpers/transformFriends'
import { setUserSstorage } from '../helpers/setUserSstorage'

function useReceiveMessageOfServer() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const friendInformation = useSelector((state) => state.friendInformation)
  const emailFriend = friendInformation.friend.email.stringValue
  const messages = useSelector((state) => state.messages)
  const friendUid = friendInformation?.friend?.uid?.stringValue
  const idConnection = [friendUid, currentUser.uid].sort().join('')
  const { findUser, userFound } = useSearchUserByEmail()
  const { findUser: findIdUser, userFound: idUserFound } = useSearchIdByEmail()
  const { updateUserInDb } = useUpdateMessagesInFirestore()
  const { updateDocument } = useUpdateInformationUser()
  const dispatch = useDispatch()
  const { findUser: findFriendInformation, userFound: friendFound } =
    useSearchUserByEmail()
  const { findUser: findIdFriend, userFound: idFriendFound } =
    useSearchIdByEmail()

  useEffect(() => {
    if (userFound && idUserFound) {
      updateUserInDb(userFound, idUserFound, messages)
    }
  }, [userFound, idUserFound, messages])

  useEffect(() => {
    if (friendFound && idFriendFound) {
      if (messages.length === 0) {
        return
      }

      const filterMessages =
        transformMessages(friendFound).filter(
          (mss) => mss?.idConnection !== idConnection
        ) || []

      const filteruserMessages =
        messages.filter((mss) => mss.idConnection === idConnection) || []

      updateDocument({
        nameOfCollection: 'users',
        idDocument: idFriendFound.id,
        newInformation: updatedInformation({
          userFound: friendFound,
          friends: transformFriends(friendFound),
          actualMessages: [...filteruserMessages, ...filterMessages]
        })
      })
    }
  }, [friendFound, idFriendFound, messages])

  useEffect(() => {
    findUser(currentUser.email)
    findIdUser(currentUser.email)
    findIdFriend(emailFriend)
    findFriendInformation(emailFriend)

    const receiveMessage = (message) => {
      const isUserOrFriend =
        message.sender === currentUser?.email
          ? currentUser.name
          : friendInformation?.friend?.name?.stringValue

      const newMessages = {
        message: message.message,
        user: isUserOrFriend,
        sender: message.sender,
        idConnection: idConnection
      }
      dispatch(updateMessages(newMessages))
    }

    socket.on('message', receiveMessage)

    return () => socket.off('message', receiveMessage)
  }, [])
  
  useEffect(() => {
    setUserSstorage({ ...currentUser, messages })
  }, [messages])
}

export { useReceiveMessageOfServer }
