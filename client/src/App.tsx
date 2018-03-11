import * as React from 'react';
import './App.css';
import { sum } from 'darkve-common';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <p>Darkve</p>
        <p>2 + 3 is {sum(2, 3)}</p>
      </div>
    );
  }
}

export default App;
