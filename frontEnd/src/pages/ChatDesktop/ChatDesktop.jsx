import { useSelector } from 'react-redux'
import { Main } from '../../components/Main/Main'
import { ActiveChats } from '../ActiveChats/ActiveChats'
import { Chat } from '../Chat/Chat'

function ChatDesktop() {
  const isOpenChat = useSelector((state) => state.isOpenChat)
console.log(isOpenChat)
  return (
    <Main>
      <div className='flex w-[90%]'>
        <ActiveChats />
        {isOpenChat.isOpen && <Chat />}
      </div>
    </Main>
  )
}

export default ChatDesktop
