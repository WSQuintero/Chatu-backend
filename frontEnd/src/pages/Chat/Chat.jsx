import { useEffect, useState } from 'react'
import { Main } from '../../components/Main/Main'
import { LuSend } from 'react-icons/lu'
import { IconContext } from 'react-icons/lib'
import { useSelector } from 'react-redux'
import { socket } from '../../socket/socket'
const actualUser = JSON.parse(sessionStorage.getItem('actualUser'))

function Chat() {
  const user = useSelector((state) => state.user)

  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message.message)
      console.log(message.sender)
      if (message.sender === actualUser.email) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: message.message, user: 'me' }
        ])
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: message.message, user: 'other' }
        ])
      }
    })
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
            message.user === 'me' ? (
              <li key={index} className='flex justify-end gap-2'>
                <p className=' break-all bg-[#D7FFD7] w-auto px-5 rounded-bl-2xl'>
                  {message.message}
                </p>
                <span className='break-all w-1/5 '>
                  {' '}
                  {user.name}:{message.user}
                </span>
              </li>
            ) : message.user === 'other' ? (
              <li
                key={index}
                className='flex justify-start gap-2 text-[#088AE1]'>
                <span className='break-all'>{message.user}: </span>
                <p className=' break-all bg-[#50EAFF]/40 w-auto px-5 rounded-br-2xl'>
                  {message.message}
                </p>
              </li>
            ) : (
              false
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
