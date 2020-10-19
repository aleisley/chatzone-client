import { BehaviorSubject } from 'rxjs'
import { useSnackbar } from 'notistack'

import useHandleResponse from '../Utilities/handle-response'

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser'))
)

const backendUrl = (
  process.env.REACT_APP_BACKEND_URL ?
    process.env.REACT_APP_BACKEND_URL :
    'http://localhost:5000'
)

const logout = () => {
  localStorage.removeItem('currentUser')
  currentUserSubject.next(null)
}

export const authenticationService = {
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value
  }
}

export const useLogin = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleResponse = useHandleResponse()

  const login = (username, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }

    return fetch(
      // `http://localhost:5000/login`,
      `${backendUrl}/login`,
      requestOptions
    )
      .then(handleResponse)
      .then(user => {
        localStorage.setItem('currentUser', JSON.stringify(user))
        currentUserSubject.next(user)
        return user
      })
      .catch(err => {
        enqueueSnackbar('Failed to Login', {
          variant: 'error'
        })
      })
  }

  return login
}

export const useRegister = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleResponse = useHandleResponse()

  const register = (name, username, password, password2) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password, password2 })
    }

    return fetch(
      // 'http://localhost:5000/register',
      `${backendUrl}/register`,
      requestOptions
    )
      .then(handleResponse)
      .then(user => {
        localStorage.setItem('currentUser', JSON.stringify(user))
        currentUserSubject.next(user)

        return user
      })
      .catch(response => {
        if (response) {
          enqueueSnackbar(response, {
            variant: 'error'
          })
        } else {
          enqueueSnackbar('Failed to Register', {
            variant: 'error'
          })
        }
      })
  }
  return register
}
