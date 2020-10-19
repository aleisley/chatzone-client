import useHandleResponse from '../Utilities/handle-response'
import authHeader from '../Utilities/auth-header'
import { useSnackbar } from 'notistack'

const backendUrl = (
  process.env.REACT_APP_BACKEND_URL ?
    process.env.REACT_APP_BACKEND_URL :
    'http://localhost:5000'
)


export const useGetUsers = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleResponse = useHandleResponse()
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  const getUsers = () => {
    return fetch(
      // 'http://localhost:5000/api/v1/users/',
      // `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/`,
      `${backendUrl}/api/v1/users/`,
      requestOptions
    )
      .then(handleResponse)
      .catch(() => {
        enqueueSnackbar('Could not load Users', {
          variant: 'error'
        })
      })
  }

  return getUsers
}
