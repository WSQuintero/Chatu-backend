import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../socket/socket'

function useReceiveMessageOfServer(setMessages) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const friendInformation = useSelector((state) => state.friendInformation)
  const friendUid = friendInformation?.friend?.uid?.stringValue
  const idConnection = [friendUid, currentUser.uid].sort().join('')
  useEffect(() => {
    const receiveMessage = (message) => {
      const isUserOrFriend =
        message.sender === currentUser?.email
          ? currentUser.name
          : friendInformation?.friend?.name?.stringValue

      const newMessages = {
        message: message.message,
        user: isUserOrFriend,
        sender: message.sender,
        idConnection:idConnection
      }

      setMessages((prev) => {
        return [...prev, newMessages]
      })
    }

    socket.on('message', receiveMessage)

    return () => socket.off('message', receiveMessage)
  }, [])
}

export { useReceiveMessageOfServer }
