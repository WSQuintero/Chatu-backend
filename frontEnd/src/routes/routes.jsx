import { Login } from '../pages/Login/Login'
import { SignUp } from '../pages/SignUp/SignUp'
import { ActiveChats } from '../components/ActiveChats/ActiveChats'
import { Chat } from '../pages/Chat/Chat'
import { createBrowserRouter } from 'react-router-dom'
import ChatDesktop from '../pages/ChatDesktop/ChatDesktop'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
  {
    path: '/active-chats',
    element: <ActiveChats />
  },
  {
    path: '/chat',
    element: <Chat />
  },
  {
    path: '/chat-desktop',
    element: <ChatDesktop />
  }
])
