import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import LanguageIcon from '@material-ui/icons/Language'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import socketIOClient from 'socket.io-client'

import { useGetConversations } from '../Services/chatService'
import { authenticationService } from '../Services/authenticationService'

const useStyles = makeStyles(theme => ({
  subheader: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  globe: {
    backgroundColor: theme.palette.primary.dark
  },
  subheaderText: {
    color: theme.palette.primary.dark
  },
  list: {
    maxHeight: '80vh',
    overflowY: 'auto'
  }
}))

const Conversations = props => {
  const classes = useStyles()
  const [conversations, setConversations] = useState([])
  const [newConversation, setNewConversation] = useState(null)
  const getConversations = useGetConversations()
  return (
    <div>

    </div>
  )
}

export default Conversations
