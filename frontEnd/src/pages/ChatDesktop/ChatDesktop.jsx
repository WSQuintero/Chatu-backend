import { Main } from '../../components/Main/Main'
import { ActiveChats } from '../ActiveChats/ActiveChats'
import { Chat } from '../Chat/Chat'

function ChatDesktop() {
  return (
    <Main>
      <div className='flex w-[90%]'>
        <ActiveChats/>
        <Chat />
      </div>
    </Main>
  )
}

export default ChatDesktop
