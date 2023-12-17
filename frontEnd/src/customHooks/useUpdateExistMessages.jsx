import { resetMessages, updateMessages } from '../redux/messageSlice'
import { useDispatch, useSelector } from 'react-redux'

function useUpdateExistMessages( ) {
  const messages = useSelector((state) => state.messages)
  const dispatch = useDispatch()

  const updateMessagesInDb = (saveInformationUser) => {
    dispatch(resetMessages())

    if (messages) {
      messages.forEach((mss) => {
        dispatch(updateMessages(mss))
      })
    } else {
      const actualMessages =
        saveInformationUser?.messages?.map((a) => ({
          message: a?.mapValue.fields.message.stringValue,
          sender: a?.mapValue.fields.sender.stringValue,
          user: a?.mapValue.fields.user.stringValue,
          idConnection: a?.mapValue?.fields?.idConnection?.stringValue || ''
        })) || []

      actualMessages.forEach((mss) => {
        dispatch(updateMessages(mss))
      })
    }
  }

  return { updateMessagesInDb }
}

export  {useUpdateExistMessages}