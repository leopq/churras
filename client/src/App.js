import React from 'react'
import Loadable from 'react-loadable'
import LoadingComponent from 'rmw-shell/lib/components/LoadingComponent'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import A2HSProvider from 'a2hs'
import theme from './config/themes/custom';
import { MuiThemeProvider } from '@material-ui/core';

import UserSignup from './pages/User/Signup';
import UserSignin from './pages/User/Signin';
import PasswordRecovery from './pages/User/PasswordRecovery';

const Loading = () => <LoadingComponent />

export const MainAsync = Loadable({
  loader: () => import('../src/containers/Main'),
  loading: Loading
})

export const LandingPageAsync = Loadable({
  loader: () => import('../src/pages/Landing'),
  loading: Loading
});

export default function App() {
  return (
    <A2HSProvider>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            {/* Unprotected routes */}
            <Route path="/" exact component={LandingPageAsync} />
            <Route path="/signup" exact component={UserSignup} />
            <Route path="/signin" exact component={UserSignin} />
            <Route path="/password-recovery" exact component={PasswordRecovery} />
            {/* Protected routes */}
            <Route component={MainAsync} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </A2HSProvider>
  )
}
