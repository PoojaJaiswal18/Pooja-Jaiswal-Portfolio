import React from 'react';
import './App.css';
import IrregularPolygonExperience from './components/background';

function App() {
  return (
    <div className="App">
      <IrregularPolygonExperience />
      <header className="App-header">
        <h1>Pooja Jaiswal</h1>
        <div className="divider"></div>
        <p className="title">Frontend Developer</p>
        {/* <p className="tagline">Creating elegant, interactive web experiences</p> */}
      </header>
    </div>
  );
}

export default App;