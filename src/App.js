import React, { useState, useEffect } from 'react';
import './App.css';
import IrregularPolygonExperience from './components/background';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar.jsx';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects.jsx';

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
          <Navbar />
          
          <main>
            <section id="about" className="section">
              <header className="App-header">
                <h1>Pooja Jaiswal</h1>
                <div className="divider"></div>
                <p className="title">Frontend Developer</p>
                {/* <p className="tagline">Creating elegant, interactive web experiences</p> */}
              </header>
            </section>
            
            <section id="skills" className="section">
              <Skills />
            </section>
            
            <section id="projects" className="section">
              <h2>Projects</h2>
              <Projects />
            </section>
            
            <section id="contact" className="section">
              <h3> Let's build something meaningful together.</h3> 
              <h3>Reach out anytime:<a href="mailto:jaiswal.pooja1809@gmail.com" aria-label="Email">
              jaiswal.pooja1809@gmail.com 
                      </a> </h3>
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;