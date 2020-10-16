import React, { useState, useEffect } from 'react'
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

  const handleRecipient = recipients => {
    recipients.forEach(recipient => {
      if (recipient.username !== authenticationService.currentUserValue.username) {
        return recipient
      }
    })
    return null
  }

  useEffect(() => {
    getConversations().then(res => setConversations(res))
  }, [newConversation])

  useEffect(() => {
    let socket = socketIOClient('http://localhost:5000')
    socket.on('messages', data => setNewConversation(data))

    return () => {
      socket.removeListener('messages')
    }
  }, [])

  return (
    <List className={classes.list}>
      <ListItem
        classes={{ root: classes.subheader }}
        onClick={() => {
          props.setScope('Global Chat')
        }}
      >
        <ListItemAvatar>
          <Avatar className={classes.globe}>
            <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          className={classes.subheaderText}
          primary="Global Chat"
        />
      </ListItem>
      <Divider />

      {conversations.map(c => (
        <ListItem
          className={classes.listItem}
          key={c._id}
          button
          onClick={() => {
            props.setUser(handleRecipient(c.recipientObj))
            props.setScope(handleRecipient(c.recipientObj).name)
          }}
        >
          <ListItemAvatar>
            <Avatar>AD</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={handleRecipient(c.recipientObj).name}
            secondary={
              <React.Fragment>
                {c.lastMessage}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}

export default Conversations
