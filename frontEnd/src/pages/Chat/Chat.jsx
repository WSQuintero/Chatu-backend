import { useEffect } from 'react'
import { Main } from '../../components/Main/Main'
import { SendMessage } from '../../components/SendMessage/SendMessage'
import { useUpdateMessagesFromFirebase } from '../../customHooks/useUpdateMessagesFromFirebase'
import { useReceiveMessageOfServer } from '../../customHooks/useReceiveMessageOfServer'
import { useDispatch, useSelector } from 'react-redux'
import { resetMessages } from '../../redux/messageSlice'

function Chat() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const messages = useSelector((state) => state.messages)
  const dispatch = useDispatch()

  useReceiveMessageOfServer()
  useUpdateMessagesFromFirebase()

  useEffect(() => {
    dispatch(resetMessages())
  }, [])

  return (
    <Main>
      <div className='flex flex-col w-[97%] px-10 gap-3 h-[99%] mt-20  bg-white  lg:rounded-tl-[100px] rounded-3xl overflow-auto  lg:rounded-br-[100px]  shadow-green-950 shadow-xl  justify-end text-[#37E23B]'>
        <ul className='h-11/12 pt-5 bg-white w-full gap-5 flex flex-col '>
          {messages
            ?.filter((mes) => mes.idConnection === currentUser.idConnection)
            ?.map((message, index) =>
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
            )}
        </ul>
        <SendMessage />
      </div>
    </Main>
  )
}

export { Chat }
