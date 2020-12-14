import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import FormGame from './pages/FormGame';
import FormFriend from './pages/Friends/Form';
import ListFriends from './pages/Friends/List';
import Home from './pages/Home';
import Login from './pages/Login';
import { isAuthenticated } from './services/auth';

const  PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact?: boolean;
}> = (props) => {

  const condition = isAuthenticated();

  return  condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
    (<Redirect  to="/login"  />);
};

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/friends" component={ListFriends} />
        <PrivateRoute path="/game/new" component={FormGame} />
        <PrivateRoute path="/game/:gameId/edit" component={FormGame} />
        <PrivateRoute path="/friend/new" component={FormFriend} />
        <PrivateRoute path="/friend/:friendId/edit" component={FormFriend} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>  
  )
}

export default Routes;