import { openModalChat } from '../redux/openChatSlice'
import { updateFriendInformation } from '../redux/friendInformationSlice'
import { socket } from '../socket/socket'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUserSstorage } from '../helpers/setUserSstorage'

function useConnectAndUpdate(foundFriendInformation) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const connectToRoom = (idConnection) => {
    dispatch(openModalChat(false))

    const connectionData = {
      id: idConnection,
      sender: currentUser.email
    }
    socket.on('joinResponse', (response) => {
      if (response.success) {
        // console.log(`Usuario unido exitosamente a la sala: ${idConnection}`)
        if (window.innerWidth < 800) {
          navigate('/chat')
        } else {
          dispatch(openModalChat(true))
        }
      } else {
        console.error(`Error al unirse a la sala: ${response.error}`)
      }
    })

    socket.emit('join', connectionData)
  }

  const updateInformationFriend = (idConnection, friendInformation) => {
    setUserSstorage({ ...currentUser, idConnection })
    dispatch(updateFriendInformation(friendInformation))
  }

  useEffect(() => {
    socket.emit('leave')
    if (foundFriendInformation) {
      const friendInformation =
        foundFriendInformation?._document?.data.value.mapValue.fields
      const friendUid = friendInformation.uid.stringValue
      const idConnection = [friendUid, currentUser.uid].sort().join('')

      updateInformationFriend(idConnection, friendInformation)
      connectToRoom(idConnection)
    }
  }, [foundFriendInformation])

  return true
}

export { useConnectAndUpdate }
