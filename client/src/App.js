import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/context/AuthContext.js';

import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import Messenger from './pages/Messenger/Messenger';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
          <Route exact path="/">
            {user ? <Home /> : <Register/>}
            
          </Route>
          <Route  path ="/login">
            {user ? <Redirect to="/"/> : <Login />}
          </Route>
          <Route  path="/register">
            {user ? <Redirect to="/"/> : <Register/>}
            
          </Route>
          <Route  path="/profile/:username">
           {user ?  <Profile /> : <Register/>}
      </Route>
      <Route path="/message">
          {user ? <Messenger/> : <Register/>}
      </Route>
  </>
  );
}

export default App;
