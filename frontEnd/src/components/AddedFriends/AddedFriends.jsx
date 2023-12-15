import { useEffect, useState } from 'react'

function AddedFriends({ inputSearch, findFriend }) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const [filterInput, setFilterInput] = useState([])
  const [withoutResults, setWithoutResults] = useState(false)

  useEffect(() => {
    if (inputSearch !== '') {
      const userFriends = currentUser.friends
      const filterMessages = userFriends.filter((message) => {
        return message.name.includes(String(inputSearch.toLowerCase()))
        //agregar despues la lógica para buscar por mensaje
      })
      setFilterInput(filterMessages)

      if (filterMessages.length === 0) {
        setWithoutResults(true)
        setTimeout(() => {
          setWithoutResults(false)
        }, 2000)
      } else {
        setWithoutResults(false)
      }
    }
  }, [inputSearch])

  return (
    <>
      {inputSearch === ''
        ? currentUser.friends.map((friend) => (
            <article
              key={friend.uid}
              className='h-[50px] flex border border-[#37E23B] text-xs items-center px-5 gap-5 hover:bg-[#D7FFD7] cursor-pointer'
              onClick={(event) => findFriend(event.target.dataset.email)}
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
              onClick={(event) => findFriend(event.target.dataset.email)}
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
