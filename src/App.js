import React from 'react';
import { BrowserRouter as Router, Route, Link,  Routes} from 'react-router-dom';


import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
    </Router>
  );
};

export default App;