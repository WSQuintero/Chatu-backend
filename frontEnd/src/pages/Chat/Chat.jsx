import { useEffect, useState } from 'react'
import { Main } from '../../components/Main/Main'
import { LuSend } from 'react-icons/lu'
import { IconContext } from 'react-icons/lib'
import { useSelector } from 'react-redux'
import { socket } from '../../socket/socket'
import { useUpdateInformationUser } from '../../customHooks/useUpdateInformationUser'
import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'
const actualUser = JSON.parse(sessionStorage.getItem('actualUser'))

function Chat() {
  const user = useSelector((state) => state.user)
  const friendInformation = useSelector((state) => state.friendInformation)

  const { updateDocument } = useUpdateInformationUser()
  const { findUser, userFinded } = useSearchIdByEmail()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    findUser(actualUser.email)
  }, [])

  console.log()
  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages((prev) => {
        return [
          ...prev,
          {
            message: message.message,
            user:
              message.sender === actualUser.email
                ? actualUser.name
                : friendInformation?.friend?.name?.stringValue
          }
        ]
      })
    }

    socket.on('message', receiveMessage)
    if (userFinded) {
      const updatedInformation = (information) =>
        information._document.data.value.mapValue.fields
      updateDocument({
        nameOfColection: 'users',
        idDocument: userFinded.id,
        newInformation: {
          email: updatedInformation(userFinded).email.stringValue,
          name: updatedInformation(userFinded).name.stringValue,
          friends: [
            ...updatedInformation(userFinded).friends.arrayValue.values.map(
              (a) => {
                return {
                  email: a.mapValue.fields.email.stringValue,
                  name: a.mapValue.fields.name.stringValue,
                  uid: a.mapValue.fields.uid.stringValue
                }
              }
            )
          ],
          idConnection: updatedInformation(userFinded).idConnection.stringValue,
          uid: updatedInformation(userFinded).uid.stringValue,
          messages: messages
        }
      })
    }
  }, [])

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
          {messages.map((message, index) =>
            message.user === actualUser.name ? (
              <li key={index} className='flex justify-end gap-2'>
                <p className=' break-all bg-[#D7FFD7] w-auto px-5 rounded-bl-2xl'>
                  {message.message}
                </p>
                <span className='break-all w-1/5 '> {actualUser.name}</span>
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
          )}
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
