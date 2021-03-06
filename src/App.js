import React from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { SnackbarProvider } from 'notistack'

import PrivateRoute from './Utilities/private-route'
import history from './Utilities/history'
import Home from './Home/Home'
import Chat from './Chat/Chat'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#58a5f0',
      main: '#0277bd',
      dark: '#004c8c'
    },
    secondary: {
      light: '#ffd95a',
      main: '#f9a825',
      dark: '#c17900',
      contrastText: '#212121'
    },
    background: {
      default: '#f0f0f0'
    }
  },
  typography: {
    useNextVariants: true
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/chat" component={Chat} />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App;
