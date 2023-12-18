import { useState } from 'react'
import { useUpdateInformationUser } from '../../customHooks/useUpdateInformationUser'
import { useGetIdOfCollection } from '../../customHooks/useGetIdOfCollection'
import { updateFriendsOfUser } from './helpersFoundFriend'

function FoundFriend({ userFound }) {
  const { actualIdOfCollection } = useGetIdOfCollection()
  const { updateDocument, isOkayUpdate } = useUpdateInformationUser()
  const [friendExist, setFriendExist] = useState(false)
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

  const handleAddListOfFriends = () => {
    updateFriendsOfUser({
      actualIdOfCollection,
      userFound,
      setFriendExist,
      updateDocument
    })
  }

  return (
    <>
      {userFound ? (
        userFound.email.stringValue !== currentUser.email ? (
          <div className='w-full p-5'>
            <article className='flex flex-col sm:flex-row justify-between  border border-[#37E23B] p-4 items-center'>
              <div className='flex gap-3'>
                <img
                  src={
                    userFound?.img?.stringValue
                      ? userFound?.img?.stringValue
                      : '/img/no-user.jpg'
                  }
                  alt={userFound.name.stringValue}
                  className='w-[60px] h-[60px] rounded-full border-4 border-[#37E23B'
                />
                <div>
                  <h3 className='text-[#19581a]'>
                    {userFound.name.stringValue}
                  </h3>
                  <p className='text-[#257726]'>
                    {userFound.email.stringValue}
                  </p>
                </div>
              </div>
              <button
                className='w-[78px] h-[80px] bg-[#8ee68f] p-4 rounded-full grid place-content-center font-medium '
                onClick={handleAddListOfFriends}>
                Añadir
              </button>
            </article>
            <div className='flex flex-col justify-center items-center'>
              {isOkayUpdate && (
                <p className='text-blue-600 mt-10 font-bold text-lg'>
                  Has añadido a {userFound?.name.stringValue} a tus amigos{' '}
                </p>
              )}
              {friendExist && (
                <p className='text-red-600 mt-10 font-bold text-lg'>
                  {userFound?.name.stringValue} ya se encuentra en tus amigos{' '}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className='w-full h-[50%] grid place-content-center text-2xl font-bold text-green-600'>
            Es tu mismo usuario
          </p>
        )
      ) : (
        <p className='w-full h-[50%] grid place-content-center text-2xl font-bold text-green-600'>
          No se encontró usuario
        </p>
      )}
    </>
  )
}

export { FoundFriend }
