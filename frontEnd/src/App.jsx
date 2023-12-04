import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('/')
function App() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, { message, user: 'other' }])
    })
  }, [messages])

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = event.target.elements.message.value
    socket.emit('message', message)
    setMessages([...messages, { message: message, user: 'me' }])

    event.target.elements.message.value = ''
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Escribe tu mensaje...' name='message' />
        <button>Enviar</button>
      </form>
      <ul>
        {messages.map(
          (message, index) =>
            message.user === 'me' ? (
              <li key={index}>
                <span>{message.user}: </span>
                {message.message}
              </li>
            ) : message.user === 'other' ? (
              <li key={index}>
                <span>{message.user}: </span>
                {message.message}
              </li>
            ) : (
              false
            )
          // {
          //   message.user === 'me' ? (
          //     <li key={index}>
          //       <span>Me: </span>
          //       {message.message}
          //     </li>
          //   ) : message.user === 'other' ? (
          //     <li key={index}>
          //       <span>Me: </span>
          //       {message.message}
          //     </li>
          //   ) : (
          //     false
          //   )
          // }
        )}
      </ul>
    </>
  )
}

export default App
