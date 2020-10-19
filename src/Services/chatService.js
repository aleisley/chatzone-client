import useHandleResponse from '../Utilities/handle-response'
import authHeader from '../Utilities/auth-header'
import { useSnackbar } from 'notistack'

const backendUrl = (
  process.env.REACT_APP_BACKEND_URL ?
    process.env.REACT_APP_BACKEND_URL :
    'http://localhost:5000'
)

// Receive global messages
export const useGetGlobalMessages = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleResponse = useHandleResponse()
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  const getGlobalMessages = () => {
    return fetch(
      // 'http://localhost:5000/api/v1/messages/global',
      `${backendUrl}/api/v1/messages/global`,
      requestOptions
    )
      .then(handleResponse)
      .catch(() => {
        enqueueSnackbar('Could not load Global Chat', {
          variant: 'error'
        })
      })
  }

  return getGlobalMessages
}

export const useSendGlobalMessage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleResponse = useHandleResponse()

  const sendGlobalMessage = body => {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({ body: body, global: true })
    }

    return fetch(
      // 'http://localhost:5000/api/v1/messages/global',
      `${backendUrl}/api/v1/messages/global`,
      requestOptions
    )
      .then(handleResponse)
      .catch(err => {
        console.log(err)
        enqueueSnackbar('Could not send message', {
          variant: 'error'
        })
      })
  }

  return sendGlobalMessage
}

export const useGetConversations = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleResponse = useHandleResponse()
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  const getConversations = () => {
    return fetch(
      // 'http://localhost:5000/api/v1/messages/conversations',
      `${backendUrl}/api/v1/messages/conversations`,
      requestOptions
    )
      .then(handleResponse)
      .catch(() => {
        enqueueSnackbar('Could not load chats', {
          variant: 'error'
        })
      })
  }

  return getConversations
}

export const useGetConversationMessages = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleResponse = useHandleResponse()
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  const getConversationMessages = id => {
    return fetch(
      // `http://localhost:5000/api/v1/messages/conversations/query?userId=${id}`,
      `${backendUrl}/api/v1/messages/conversations/query?userId=${id}`,
      requestOptions
    )
      .then(handleResponse)
      .catch(() => {
        enqueueSnackbar('Could not load chats', {
          variant: 'error'
        })
      })
  }

  return getConversationMessages
}

export const useSendConversationMessage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleResponse = useHandleResponse()

  const sendConversationMessage = (id, body) => {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify({ to: id, body: body })
    }

    return fetch(
      // 'http://localhost:5000/api/v1/messages',
      `${backendUrl}/api/v1/messages`,
      requestOptions
    )
      .then(handleResponse)
      .catch(err => {
        console.log(err)
        enqueueSnackbar('Could not send message', {
          variant: 'error'
        })
      })
  }

  return sendConversationMessage
}
