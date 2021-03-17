import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './rotas'

import UserProvider from './global/context/Actions'
function App() {
  return (
  
    <div className="App">
      <UserProvider>
        <Routes />
        </UserProvider>
      </div>
    
  );
}

export default App;
