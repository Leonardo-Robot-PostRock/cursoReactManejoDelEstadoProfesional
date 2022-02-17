import React from 'react';
import './App.css';
import { UseReducer } from './UseReducer';
import { UseState } from './UseState';

function App() {
  return (
    <div className="App">
      <UseState name="Use State"/>
      <UseReducer name="Use Reducer"/>
    </div>
  );
}

export default App;
