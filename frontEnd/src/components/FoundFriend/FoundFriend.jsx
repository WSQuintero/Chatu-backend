import { useState } from 'react'
import { useUpdateInformationUser } from '../../customHooks/useUpdateInformationUser'
import { useGetIdOfCollection } from '../../customHooks/useGetIdOfCollection'

function FoundFriend({ userFound }) {
  const { actualIdOfCollection } = useGetIdOfCollection()
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const { updateDocument, isOkayUpdate } = useUpdateInformationUser()
  const [friendExist, setFriendExist] = useState(false)
  const userFoundImg = userFound?.img?.stringValue
  const userFriends = currentUser.friends

  const handleAddListOfFriends = () => {
    if (actualIdOfCollection) {
      const updatedUser = [
        ...userFriends,
        {
          name: userFound.name.stringValue,
          email: userFound.email.stringValue,
          uid: userFound.uid.stringValue
        }
      ]
      const friendAlreadyExist = userFriends?.some(
        (user) => user.email === userFound.email.stringValue
      )
      if (friendAlreadyExist) {
        setFriendExist(true)
        setTimeout(() => {
          setFriendExist(false)
        }, 2000)
      } else {
        const updatedFriends = JSON.stringify({
          ...currentUser,
          friends: updatedUser
        })
        updateDocument({
          nameOfCollection: 'users',
          idDocument: actualIdOfCollection,
          newInformation: {
            ...currentUser,
            friends: updatedUser,
            messages: []
          }
        })

        sessionStorage.setItem('currentUser', updatedFriends)
      }
    }
  }
  return (
    <>
      {userFound && (
        <div className='w-full p-5'>
          <article className='flex flex-col sm:flex-row justify-between  border border-[#37E23B] p-4 items-center'>
            <div className='flex gap-3'>
              <img
                src={userFoundImg ? userFoundImg : '/img/no-user.jpg'}
                alt={userFound.name.stringValue}
                className='w-[60px] h-[60px] rounded-full border-4 border-[#37E23B'
              />
              <div>
                <h3 className='text-[#19581a]'>{userFound.name.stringValue}</h3>
                <p className='text-[#257726]'>{userFound.email.stringValue}</p>
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
      )}
    </>
  )
}

export { FoundFriend }
