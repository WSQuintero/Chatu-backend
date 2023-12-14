import { useEffect, useRef, useState } from 'react'
import { Main } from '../../components/Main/Main'
import { LuSend } from 'react-icons/lu'
import { IconContext } from 'react-icons/lib'
import { useSelector } from 'react-redux'
import { socket } from '../../socket/socket'
import { useUpdateInformationUser } from '../../customHooks/useUpdateInformationUser'
import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

function Chat() {
  const friendInformation = useSelector((state) => state.friendInformation)

  const { updateDocument: updateActualUserInformation } =
    useUpdateInformationUser()
  const { findUser: findActualUser, userFound: actualUserInformation } =
    useSearchIdByEmail()
  const [messages, setMessages] = useState([])
  const [groupOfMessages, setGroupOfMessages] = useState([])

  /*EL siguiente useEffect contiene el evento asociado al servidor
  que se encarga de recibir los mensajes llegados de este y actualizar el estado messages con esto */
  useEffect(() => {
    findActualUser(currentUser.email)
    const receiveMessage = (message) => {
      
      const isUserOrFriend=message.sender === currentUser?.email
            ? currentUser.name
            : friendInformation?.friend?.name?.stringValue

      const newMessages = {
        message: message.message,
        user: isUserOrFriend,
        sender: message.sender
      }
      setGroupOfMessages((prev) => [...prev, newMessages])
      setMessages((prev) => {
        return [
          ...prev,
          {
            message: message.message,
            user:
              message.sender === currentUser?.email
                ? currentUser.name
                : friendInformation?.friend?.name?.stringValue,
            sender: message.sender
          }
        ]
      })
    }

    socket.on('message', receiveMessage)
  }, [])

  // useEffect(() => {
  //   console.log(groupOfMessages)
  // }, [groupOfMessages])

  /* El siguiente useEffect sirve para que en el momento en que se encuentra el usuario actual
  se actualice el estado messages con dicha información */
  useEffect(() => {
    if (actualUserInformation) {
      const actualUser = (information) =>
        information?._document?.data.value.mapValue.fields
      const messagesInDbExist = actualUser(actualUserInformation)?.messages
        ?.arrayValue.values

      if (messagesInDbExist) {
        setMessages(
          actualUser(actualUserInformation)?.messages?.arrayValue?.values.map(
            (a) => {
              return {
                message: a?.mapValue.fields.message.stringValue,
                sender: a?.mapValue.fields.sender.stringValue,
                user: a?.mapValue.fields.user.stringValue
              }
            }
          )
        )
      } else {
        setMessages([])
      }
    }
  }, [actualUserInformation])

  //El siguiente useEffect sirve para actualizar la información en firestore
  useEffect(() => {
    if (actualUserInformation) {
      const actualUser = (information) =>
        information._document.data.value.mapValue.fields
      const actualUserIdConnection = actualUser(actualUserInformation)
        .idConnection.stringValue
      const actualUserFriends = actualUser(
        actualUserInformation
      ).friends.arrayValue.values.map((a) => {
        return {
          email: a.mapValue.fields.email.stringValue,
          name: a.mapValue.fields.name.stringValue,
          uid: a.mapValue.fields.uid.stringValue
        }
      })

      updateActualUserInformation({
        nameOfCollection: 'users',
        idDocument: actualUserInformation.id,
        newInformation: {
          email: actualUser(actualUserInformation).email.stringValue,
          name: actualUser(actualUserInformation).name.stringValue,
          friends: [...actualUserFriends],
          idConnection: actualUserIdConnection,
          uid: actualUser(actualUserInformation).uid.stringValue,
          messages: messages
        }
      })
    }
  }, [messages])

  /*La siguiente función es la relacionada con el boton de enviar
   mensaje y sirve recibir y emitir al servidor el nuevo mensaje*/

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = event.target.elements.message.value
    socket.emit('message', message)
    event.target.elements.message.value = ''
  }

  return (
    <Main>
      <div className='flex flex-col w-[97%] px-10 gap-3 h-[99%] mt-20  bg-white  lg:rounded-tl-[100px] rounded-3xl overflow-auto  lg:rounded-br-[100px]  shadow-green-950 shadow-xl  justify-end text-[#37E23B]'>
        <ul className='h-11/12 pt-5 bg-white w-full gap-5 flex flex-col '>
          {
            // messages.some(
            //   (message) =>
            //     message.sender === friendInformation.friend.email.stringValue
            // ) &&
            messages.map((message, index) =>
              message.user === currentUser.name ? (
                <li key={index} className='flex justify-end gap-2'>
                  <p className=' break-all bg-[#D7FFD7] w-auto px-5 rounded-bl-2xl'>
                    {message.message}
                  </p>
                  <span className='break-all w-1/5 '> {currentUser.name}</span>
                </li>
              ) : (
                <li
                  key={index}
                  className='flex justify-start gap-2 text-[#088AE1]'>
                  <span className='break-all'>{message.user}: </span>
                  <p className=' break-all bg-[#50EAFF]/40 w-auto px-5 rounded-br-2xl'>
                    {message.message}
                  </p>
                </li>
              )
            )
          }
        </ul>
        <form
          onSubmit={handleSubmit}
          className='h-1/12 bg-[#D7FFD7] flex w-full relative'>
          <textarea
            type='text'
            placeholder='Escribe tu mensaje...'
            name='message'
            className='w-full h-full outline-none pl-5 pr-20 overflow-hidden'
          />
          <button className='p-2 bg-[#008E00] rounded-tl-2xl absolute right-0 h-full grid place-content-center'>
            <IconContext.Provider value={{ color: 'white', size: '25px' }}>
              <LuSend />
            </IconContext.Provider>
          </button>
        </form>
      </div>
    </Main>
  )
}

export { Chat }
