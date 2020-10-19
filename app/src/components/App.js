import React from 'react';
import '../assets/App.css';
import Header from './Header.js';
import PropertyController from './PropertyController'


class App extends React.Component {
  
  constructor() {
    super()
    this.state = {}
  }
  
  render() {
    return (
    <div className="App">
      <Header />
      <PropertyController />
    </div>
  )}
}

export default App;
