import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JoinForm from './components/JoinForm/joinForm';

class App extends Component {
  state = { 
  }

  render() { 
    return (
      <div>
        <JoinForm />
      </div>
    );
  }
}
 
export default App;