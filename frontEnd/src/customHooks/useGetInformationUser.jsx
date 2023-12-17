import { useEffect, useState } from "react"
import { useSearchUserByEmail } from "./useSearchUserByEmail"

function useGetInformationUser(currentUser) {
  const [saveInformationUser, setSaveInformationUser] = useState()
    const { findUser, userFound: userInformation } = useSearchUserByEmail()
    
    useEffect(() => {
      findUser(currentUser.email)
    }, [])

    useEffect(() => {
      if (userInformation) {
        setSaveInformationUser(userInformation)
      }
    }, [userInformation])
  return { saveInformationUser }
}

export  {useGetInformationUser}