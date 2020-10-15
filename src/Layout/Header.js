import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

import { authenticationService } from '../Services/authenticationService'
import history from '../Utilities/history'
import logo from './logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    display: 'flex'
  },
  userDropdown: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto'
    }
  }
}))

const Header = () => {

}
