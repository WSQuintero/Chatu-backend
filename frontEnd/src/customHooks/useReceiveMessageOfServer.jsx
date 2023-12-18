import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket/socket'
import { updateMessages } from '../redux/messageSlice'
import { useSearchUserByEmail } from './useSearchUserByEmail'
import { useUpdateMessagesInFirestore } from './useUpdateMessagesInFirestore'
import { useSearchIdByEmail } from './useSearchIdByEmail'
import { useUpdateInformationUser } from './useUpdateInformationUser'

function useReceiveMessageOfServer() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const friendInformation = useSelector((state) => state.friendInformation)
  const messages = useSelector((state) => state.messages)
  const friendUid = friendInformation?.friend?.uid?.stringValue
  const idConnection = [friendUid, currentUser.uid].sort().join('')
  const dispatch = useDispatch()
  const { findUser, userFound } = useSearchUserByEmail()
  const { findUser: findFriendInformation, userFound: friendFound } =
    useSearchUserByEmail()
  const { findUser: findIdUser, userFound: idUserFound } = useSearchIdByEmail()
  const { findUser: findIdFriend, userFound: idFriendFound } =
    useSearchIdByEmail()
  const { updateUserInDb } = useUpdateMessagesInFirestore()
  const emailFriend = friendInformation.friend.email.stringValue
  const { updateDocument, isOkayUpdate, setIsOkayUpdate } =
    useUpdateInformationUser()

  useEffect(() => {
    if (userFound && idUserFound) {
      updateUserInDb(userFound, idUserFound, messages)
    }
  }, [userFound, idUserFound, messages])

  useEffect(() => {
    if (friendFound && idFriendFound) {
      if (messages.length === 0) return
      const actualMessages =
        friendFound?.messages?.arrayValue?.values?.map((mss) => {
          return {
            idConnection: mss.mapValue.fields.idConnection?.stringValue,
            message: mss.mapValue.fields.message?.stringValue,
            sender: mss.mapValue.fields.sender?.stringValue,
            user: mss.mapValue.fields.user?.stringValue
          }
        }) || []

      const filterMessages =
        actualMessages.filter((mss) => {
          return mss?.idConnection !== idConnection
        }) || []

      const filteruserMessages =
        messages.filter((mss) => mss.idConnection === idConnection) || []

      const newMessagesFriend = {
        email: friendFound?.email?.stringValue,
        friends:
          friendFound?.friends?.arrayValue?.values?.map((fOf) => {
            return {
              email: fOf?.mapValue.fields.email?.stringValue,
              name: fOf?.mapValue.fields.name?.stringValue,
              uid: fOf?.mapValue.fields.uid?.stringValue,
              perfilPhoto: fOf?.mapValue.fields.perfilPhoto?.stringValue
            }
          }) || [],
        idConnection: friendFound?.idConnection?.stringValue || '',
        messages: [...filteruserMessages, ...filterMessages],
        name: friendFound?.name?.stringValue,
        uid: friendFound?.uid?.stringValue,
        perfilPhoto: friendFound?.perfilPhoto?.stringValue
      }

      updateDocument({
        nameOfCollection: 'users',
        idDocument: idFriendFound.id,
        newInformation: newMessagesFriend
      })
    }
  }, [friendFound, idFriendFound, messages])

  useEffect(() => {
    findUser(currentUser.email)
    findIdUser(currentUser.email)
    findIdFriend(emailFriend) //creo que el problema está aquí
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
}

export { useReceiveMessageOfServer }
