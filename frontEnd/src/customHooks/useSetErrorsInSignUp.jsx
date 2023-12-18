import { useEffect } from 'react'

function useSetErrorsInSignUp({ errorAddUser, SetError }) {
  useEffect(() => {
    switch (errorAddUser?.errorCode) {
      case 'auth/weak-password':
        SetError('La contraseña debe ser mayor a 6 dígitos')
        setTimeout(() => {
          SetError('')
        }, 2000)
        break
      case 'auth/email-already-in-use':
        SetError('EL correo ya se encuentra registrado')
        setTimeout(() => {
          SetError('')
        }, 2000)
        break
    }
  }, [errorAddUser])

  return true
}

export { useSetErrorsInSignUp }
