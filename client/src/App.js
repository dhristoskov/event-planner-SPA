import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import MainHeader from './shared/components/Navigation/MainHeader';
import LandingPage from './Landing/LandingPage';
import EventElementsPage from './EventPlanner/pages/EventElementPage';
import EventPlaner from './EventPlanner/pages/EventPlanner';
import ResetForm from './Users/components/ResetForm';
import ThemeContextProvider from './shared/contexts/theme-context';
import AuthContextProvider from './shared/contexts/auth-context';
import './styles/App.css';

function App() {
  
  return (
        <Router>
          <AuthContextProvider>
          <ThemeContextProvider>
              <MainHeader />
                  <Switch>
                      <Route exact path='/' component={LandingPage} />
                      <Route path='/events/user/:id' component={EventPlaner} />
                      <Route path='/event/:id' component={EventElementsPage} />
                      <Route path='/email/reset/:token' component={ResetForm} />
                      <Redirect to='/' />
                  </Switch>
            </ThemeContextProvider>
            </AuthContextProvider>
        </Router>
      );
}

export default App;
