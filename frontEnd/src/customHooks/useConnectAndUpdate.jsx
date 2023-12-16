import { openModalChat } from '../redux/openChatSlice'
import { updateFriendInformation } from '../redux/friendInformationSlice'
import { socket } from '../socket/socket'
import { addUser } from '../redux/userSlice'
import { useUpdateInformationUser } from './useUpdateInformationUser'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function useConnectAndUpdate(found) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const connectToRoom = (idConnection) => {
    const connectionData = {
      id: idConnection,
      sender: currentUser.email
    }
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

    socket.emit('join', connectionData)
  }

  useEffect(() => {
    if (found) {
      const friendInformation = found?._document?.data.value.mapValue.fields
      const friendUid = friendInformation.uid.stringValue
      const idConnection = [friendUid, currentUser.uid].sort().join('')
      sessionStorage.setItem(
        'currentUser',
        JSON.stringify({ ...currentUser, idConnection })
      )
      dispatch(updateFriendInformation(friendInformation))
      connectToRoom(idConnection)
    }
  }, [found])

  return true
}

export { useConnectAndUpdate }
