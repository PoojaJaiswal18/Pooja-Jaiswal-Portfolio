import React, { useState, useEffect, useRef } from 'react';
import './Skills.css';

function Skills() {
  const [currentLine, setCurrentLine] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  
  const terminalRef = useRef(null);
  
  const lines = [
    { command: "cd skills", output: "", directory: "~" },
    { command: "ls", output: ["React", "Javascript", "CSS", "Java", "Javafx"], directory: "~/skills" }
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 600);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animationStarted && !animationCompleted) {
            setAnimationStarted(true);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }
    
    return () => {
      if (terminalRef.current) {
        observer.unobserve(terminalRef.current);
      }
    };
  }, [animationStarted, animationCompleted]);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (animationCompleted) {
          setCurrentLine(0);
          setTypingIndex(0);
          setTyped("");
          setAnimationStarted(false);
          setAnimationCompleted(false);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [animationCompleted]);
  
  useEffect(() => {
    if (!animationStarted) return;
    
    if (currentLine < lines.length) {
      if (typingIndex < lines[currentLine].command.length) {
        const timer = setTimeout(() => {
          setTyped(prev => prev + lines[currentLine].command[typingIndex]);
          setTypingIndex(prev => prev + 1);
        }, 100);
        
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setTypingIndex(0);
          setTyped("");
        }, 800);
        
        return () => clearTimeout(timer);
      }
    } else if (currentLine === lines.length && !animationCompleted) {
      setAnimationCompleted(true);
    }
  }, [currentLine, typingIndex, animationStarted]);

 
  const getPrompt = (lineIndex) => {
    if (lineIndex < lines.length) {
      return `pooja@jaiswal:${lines[lineIndex].directory}$`;
    }
 
    return `pooja@jaiswal:${lines[lines.length - 1].directory}$`;
  };

  return (
    <div className="terminal-card" ref={terminalRef}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="button red"></div>
          <div className="button yellow"></div>
          <div className="button green"></div>
        </div>
        <div className="terminal-title">pooja@jaiswal ~ terminal</div>
      </div>
      
      <div className="terminal-body">
     
        {lines.slice(0, currentLine).map((line, index) => (
          <div key={index} className="command-block">
            <div className="command-line">
              <span className="prompt">{getPrompt(index)}</span>
              <span className="command-text">{line.command}</span>
            </div>
            {line.output && (
              <div className="command-output">
                {Array.isArray(line.output) ? (
                  <div className="output-grid">
                    {line.output.map((item, i) => (
                      <div key={i} className="skill-item">{item}</div>
                    ))}
                  </div>
                ) : (
                  <div>{line.output}</div>
                )}
              </div>
            )}
          </div>
        ))}
        
       
        {animationStarted && currentLine < lines.length && (
          <div className="command-line">
            <span className="prompt">{getPrompt(currentLine)}</span>
            <span className="command-text">{typed}</span>
            <span className={`cursor ${cursorVisible ? 'visible' : 'hidden'}`}></span>
          </div>
        )}
        
    
        {animationCompleted && (
          <div className="command-line">
            <span className="prompt">{getPrompt(lines.length - 1)}</span>
            <span className={`cursor ${cursorVisible ? 'visible' : 'hidden'}`}></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Skills;