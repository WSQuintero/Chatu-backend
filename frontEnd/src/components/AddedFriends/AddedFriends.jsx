import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetMessages, updateMessages } from '../../redux/messageSlice'
import { useSearchUserByEmail } from '../../customHooks/useSearchUserByEmail'
import { useSearchIdByEmail } from '../../customHooks/useSearchIdByEmail'
import { useConnectAndUpdate } from '../../customHooks/useConnectAndUpdate'
import { useSearchUserByInput } from '../../customHooks/useSearchUserByInput'
import { useGetInformationUser } from '../../customHooks/useGetInformationUser'
import { useUpdateExistMessages } from '../../customHooks/useUpdateExistMessages'

function AddedFriends({ inputSearch }) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const { findUser: findFriend, userFound: foundFriend } = useSearchIdByEmail()
  const { updateMessagesInDb } = useUpdateExistMessages()
  const { saveInformationUser } = useGetInformationUser(currentUser)
  useConnectAndUpdate(foundFriend)

  const { filterInput, withoutResults } = useSearchUserByInput(
    inputSearch,
    currentUser
  )

  const handleOpenFriendChat = (event) => {
    updateMessagesInDb(saveInformationUser)
    findFriend(event.target.dataset.email)
  }

  return (
    <>
      {inputSearch === ''
        ? currentUser.friends.map((friend) => (
            <article
              key={friend.uid}
              className='h-[50px] flex border border-[#37E23B] text-xs items-center px-5 gap-5 hover:bg-[#D7FFD7] cursor-pointer'
              onClick={handleOpenFriendChat}
              data-email={friend.email}>
              <img
                src={friend?.img || '/img/no-user.jpg'}
                alt='user image'
                className='h-[90%] object-cover rounded-full'
              />
              <div className='overflow-hidden'>
                <h3 className='font-bold text-md'>{friend.name}</h3>
              </div>
            </article>
          ))
        : filterInput.map((friend) => (
            <article
              key={friend.uid}
              className='h-[50px] flex border border-[#37E23B] text-xs items-center px-5 gap-5 hover:bg-[#D7FFD7] cursor-pointer'
              onClick={handleOpenFriendChat}
              data-email={friend.email}>
              <img
                src={friend?.img || '/img/no-user.jpg'}
                alt='user image'
                className='h-[90%] object-cover rounded-full'
              />
              <div className='overflow-hidden'>
                <h3 className='font-bold text-md'>{friend.name}</h3>
                <p className='overflow-hidden whitespace-nowrap w-full'>
                  {friend.message}
                </p>
              </div>
            </article>
          ))}
      {withoutResults && (
        <p className='text-[#37E23B] '>No se encontrarón resultados</p>
      )}
    </>
  )
}

export { AddedFriends }
