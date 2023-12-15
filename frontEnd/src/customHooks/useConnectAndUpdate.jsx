import { openModalChat } from '../redux/openChatSlice'
import { updateFriendInformation } from '../redux/friendInformationSlice'
import { socket } from '../socket/socket'
import { addUser } from '../redux/userSlice'
import { useUpdateInformationUser } from './useUpdateInformationUser'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

function useConnectAndUpdate() {
  const { updateDocument: updateUser } = useUpdateInformationUser()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

  const connectAndUpdate = (found) => {
    const friendInformation = found?._document?.data.value.mapValue.fields
    const friendUid = friendInformation.uid.stringValue
    const idConnection = [friendUid, currentUser.uid].sort().join('')

    const friendsOfFriend =
      friendInformation.friends.arrayValue?.values.map((f) => {
        return {
          name: f.mapValue.fields.name.stringValue,
          email: f.mapValue.fields.email.stringValue,
          uid: f.mapValue.fields.uid.stringValue
        }
      }) || []

    const updatedUser = {
      idConnection,
      name: friendInformation.name.stringValue,
      email: friendInformation.email.stringValue,
      uid: friendInformation.uid.stringValue,
      friends: friendsOfFriend
    }

    const connectionData = {
      id: idConnection,
      sender: currentUser.email
    }
    const connectToRoom = () => {
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

    const updateUserInDb = () => {
      dispatch(updateFriendInformation(friendInformation))

      updateUser({
        nameOfCollection: 'users',
        idDocument: found?.id,
        newInformation: updatedUser
      })
      dispatch(addUser(updatedUser))
    }

    updateUserInDb()
    connectToRoom()
  }

  return { connectAndUpdate }
}

export { useConnectAndUpdate }
