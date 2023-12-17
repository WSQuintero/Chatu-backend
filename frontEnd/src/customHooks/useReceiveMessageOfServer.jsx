import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket/socket'
import { updateMessages } from '../redux/messageSlice'
import { useSearchUserByEmail } from './useSearchUserByEmail'
import { useUpdateMessagesInFirestore } from './useUpdateMessagesInFirestore'
import { useSearchIdByEmail } from './useSearchIdByEmail'

function useReceiveMessageOfServer() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const friendInformation = useSelector((state) => state.friendInformation)
  const messages = useSelector((state) => state.messages)
  const friendUid = friendInformation?.friend?.uid?.stringValue
  const idConnection = [friendUid, currentUser.uid].sort().join('')
  const dispatch = useDispatch()
  const { updateUserInDb } = useUpdateMessagesInFirestore()
const { findUser, userFound } = useSearchUserByEmail()
const { findUser:findIdUser, userFound:idUserFound } = useSearchIdByEmail()
  
useEffect(() => {
  if (userFound && idUserFound) {
    updateUserInDb(userFound, idUserFound,messages)
  }
}, [userFound, idUserFound,messages])

  useEffect(() => {
    findUser(currentUser.email)
    findIdUser(currentUser.email)
    
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
