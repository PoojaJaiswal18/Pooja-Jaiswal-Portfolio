import React, { useState, useEffect } from 'react';
import './App.css';
import IrregularPolygonExperience from './components/background';
import Loader from './components/Loader/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <IrregularPolygonExperience />
          <header className="App-header">
            <h1>Pooja Jaiswal</h1>
            <div className="divider"></div>
            <p className="title">Frontend Developer</p>
            {/* <p className="tagline">Creating elegant, interactive web experiences</p> */}
          </header>
        </>
      )}
    </div>
  );
}

export default App;