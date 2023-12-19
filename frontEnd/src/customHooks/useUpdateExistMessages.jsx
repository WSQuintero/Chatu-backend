import { transformMessages } from '../helpers/transformMessages'
import { resetMessages, updateMessages } from '../redux/messageSlice'
import { useDispatch, useSelector } from 'react-redux'

function useUpdateExistMessages() {
  const messages = useSelector((state) => state.messages)
  const dispatch = useDispatch()

  const updateMessagesInDb = (saveInformationUser) => {
    dispatch(resetMessages())

    if (messages) {
      messages.forEach((mss) => {
        dispatch(updateMessages(mss))
      })
    } else {
      transformMessages(saveInformationUser) ||
        []?.forEach((mss) => {
          dispatch(updateMessages(mss))
        })
    }
  }

  return { updateMessagesInDb }
}

export { useUpdateExistMessages }
