import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [loadingText, setLoadingText] = useState('Building interfaces...');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingMessages] = useState([
    "Building interfaces...",
    "Crafting experiences...",
    "Loading portfolio..."
  ]);
  
  useEffect(() => {
   
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 500); 
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 6000); 
    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setLoadingText(loadingMessages[randomIndex]);
    }, 3000);
    
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
      clearInterval(messageInterval);
    };
  }, [loadingMessages]);
  

  if (isComplete) {
    return null;
  }
  
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
      
        <div className={`code-brackets ${isRevealed ? 'expanded' : ''}`}>
          <span className="code-bracket bracket-left">{'{'}</span>
          <div className="loader-content">
            {isRevealed && (
              <>
                <img src="/loader.png" alt="Loading..." className="loader-image pop-in" />

              </>
            )}
          </div>
          
          <span className="code-bracket bracket-right">{'}'}</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;