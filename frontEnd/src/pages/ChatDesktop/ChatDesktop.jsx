import { ActiveChats } from '../../components/ActiveChats/ActiveChats'
import { Main } from '../../components/Main/Main'
import { Chat } from '../Chat/Chat'

function ChatDesktop() {
  return (
    <Main>
      <div className='flex w-[90%]'>
        <ActiveChats />
        <Chat />
      </div>
    </Main>
  )
}

export default ChatDesktop
