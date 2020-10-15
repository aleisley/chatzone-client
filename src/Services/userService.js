import useHandleResponse from '../Utilities/handle-response'
import authHeader from '../Utilities/auth-header'
import { useSnackbar } from 'nontistack'

export default () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleResponse = useHandleResponse()
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  const getUsers = () => {
    return fetch(
      'http://localhost:5000/api/users/',
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
