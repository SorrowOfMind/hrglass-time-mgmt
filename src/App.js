import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './Routes';
import NavBar from './components/navigation/NavBar';


function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes />
      </div>
    </Router>
  );
}

export default App;