import { useEffect, useState } from 'react'

function useSearchUserByInput( inputSearch, currentUser ) {
  const [withoutResults, setWithoutResults] = useState(false)
  const [filterInput, setFilterInput] = useState([])
  
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

  return { filterInput, withoutResults }
}

export { useSearchUserByInput }
