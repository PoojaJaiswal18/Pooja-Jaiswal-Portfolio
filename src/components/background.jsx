import { useState, useEffect, useRef } from 'react';


const createIrregularPolygon = (size, pointCount = 6) => {
  const points = [];
  
 
  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * Math.PI * 2;
  
    const randomRadius = size * (0.3 + Math.random() * 0.7);
    points.push({
      x: Math.cos(angle) * randomRadius,
      y: Math.sin(angle) * randomRadius
    });
  }
  
  return points.map(point => ({
    x: point.x + (Math.random() - 0.5) * size * 0.4,
    y: point.y + (Math.random() - 0.5) * size * 0.4
  }));
};

const Polygon = ({ id, points, position, speed, size, onBreak, lifespan }) => {
  const [isBreaking, setIsBreaking] = useState(false);
  
  const handleMouseEnter = () => {
    if (!isBreaking) {
      setIsBreaking(true);
      onBreak(id, points, position, size);
    }
  };
  
  const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');
  
  const polygonStyle = {
    transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
    transition: 'transform 0.3s ease-out',
    opacity: isBreaking ? 0 : 1,
  };
  
  return (
    <polygon 
      points={pointsString}
      fill="transparent"
      stroke="rgba(255, 255, 255, 0.6)" 
      strokeWidth="1"
      style={polygonStyle}
      onMouseEnter={handleMouseEnter}
      className="transition-opacity duration-700"
    />
  );
};

export default function IrregularPolygonBackground() {
  const [polygons, setPolygons] = useState([]);
  const [nextId, setNextId] = useState(0);
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [fragments, setFragments] = useState([]);
  
  const createPolygon = (x, y, size = null, pointCount = null) => {
    const defaultSize = size || 40 + Math.random() * 80;
    const sides = pointCount || Math.floor(5 + Math.random() * 6);
    const id = nextId + Math.random();
    
   
    let entryX, entryY;
    const entryDirection = Math.floor(Math.random() * 4);
    switch(entryDirection) {
      case 0: 
        entryX = Math.random() * dimensions.width;
        entryY = -defaultSize;
        break;
      case 1: 
        entryX = dimensions.width + defaultSize;
        entryY = Math.random() * dimensions.height;
        break;
      case 2: 
        entryX = Math.random() * dimensions.width;
        entryY = dimensions.height + defaultSize;
        break;
      case 3: 
        entryX = -defaultSize;
        entryY = Math.random() * dimensions.height;
        break;
      default:
        entryX = Math.random() * dimensions.width;
        entryY = Math.random() * dimensions.height;
    }
    
    return {
      id,
      points: createIrregularPolygon(defaultSize, sides),
      position: {
        x: x !== undefined ? x : entryX,
        y: y !== undefined ? y : entryY,
        rotation: Math.random() * 360
      },
      speed: {
        x: (Math.random() - 0.5) * 0.8,
        y: (Math.random() - 0.5) * 0.8,
        rotation: (Math.random() - 0.5) * 0.3
      },
      size: defaultSize,
      lifespan: Math.random() * 12000 + 15000,
      createdAt: Date.now()
    };
  };
  
 
  useEffect(() => {
 
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);
  
  
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
   
    const initialPolygons = [];
    for (let i = 0; i < 35; i++) {
      initialPolygons.push(createPolygon());
    }
    
    setPolygons(initialPolygons);
    setNextId(prev => prev + initialPolygons.length);
    

    const animate = () => {
    
      setPolygons(prevPolygons => {
        const now = Date.now();
        return prevPolygons.map(polygon => {
          const newX = polygon.position.x + polygon.speed.x;
          const newY = polygon.position.y + polygon.speed.y;
          const newRotation = polygon.position.rotation + polygon.speed.rotation;
        
          const buffer = polygon.size * 2;
          const isOutOfBounds = 
            newX < -buffer || 
            newX > dimensions.width + buffer || 
            newY < -buffer || 
            newY > dimensions.height + buffer;
            
          const isExpired = now - polygon.createdAt > polygon.lifespan;
          
          if (isOutOfBounds || isExpired) {
            return null;
          }

          return {
            ...polygon,
            position: {
              x: newX,
              y: newY,
              rotation: newRotation
            }
          };
        }).filter(Boolean);
      });
      
    
      setFragments(prevFragments => {
        const currentTime = Date.now();
        const updatedFragments = prevFragments.map(fragment => {
          const newX = fragment.position.x + fragment.speed.x;
          const newY = fragment.position.y + fragment.speed.y;
          const newRotation = fragment.position.rotation + fragment.speed.rotation;
       
          const slowDownFactor = 0.99;
          
         
          const canRecombineNow = !fragment.canRecombine && 
            (currentTime - fragment.createdAt > fragment.recombineDelay);
     
          const buffer = fragment.size * 2;
          const isOutOfBounds = 
            newX < -buffer || 
            newX > dimensions.width + buffer || 
            newY < -buffer || 
            newY > dimensions.height + buffer;
            
          if (isOutOfBounds) {
            return null;
          }
          
          return {
            ...fragment,
            position: {
              x: newX,
              y: newY,
              rotation: newRotation
            },
            speed: {
              x: fragment.speed.x * slowDownFactor,
              y: fragment.speed.y * slowDownFactor,
              rotation: fragment.speed.rotation * slowDownFactor
            },
            canRecombine: fragment.canRecombine || canRecombineNow
          };
        }).filter(Boolean);
      
        const recombinableFragments = updatedFragments.filter(f => f.canRecombine);
        const newPolygons = [];
        const usedFragments = new Set();
        
   
        for (let i = 0; i < recombinableFragments.length; i++) {
          if (usedFragments.has(recombinableFragments[i].id)) continue;
          
          const nearbyFragments = [recombinableFragments[i]];
          usedFragments.add(recombinableFragments[i].id);
          
          for (let j = i + 1; j < recombinableFragments.length; j++) {
            if (usedFragments.has(recombinableFragments[j].id)) continue;
            
            const fragment1 = recombinableFragments[i];
            const fragment2 = recombinableFragments[j];
      
            const distance = Math.sqrt(
              Math.pow(fragment1.position.x - fragment2.position.x, 2) +
              Math.pow(fragment1.position.y - fragment2.position.y, 2)
            );
            
           
            if (distance < 100) {
              nearbyFragments.push(fragment2);
              usedFragments.add(fragment2.id);
             
              if (nearbyFragments.length >= 2 && Math.random() < 0.1) {
                const avgX = nearbyFragments.reduce((sum, f) => sum + f.position.x, 0) / nearbyFragments.length;
                const avgY = nearbyFragments.reduce((sum, f) => sum + f.position.y, 0) / nearbyFragments.length;
                
                const newSize = Math.max(...nearbyFragments.map(f => f.size)) * 2;
                newPolygons.push(createPolygon(avgX, avgY, newSize));
                break;
              }
            }
          }
        }
      
        if (newPolygons.length > 0) {
          setPolygons(prev => [...prev, ...newPolygons]);
        }
        
      
        return updatedFragments.filter(f => !usedFragments.has(f.id));
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    frameRef.current = requestAnimationFrame(animate);

    const addNewPolygonsInterval = setInterval(() => {
      setPolygons(prevPolygons => {
        if (prevPolygons.length < 35) {
          const newPolygons = [];
          const polygonsToAdd = Math.min(3, 35 - prevPolygons.length);
          
          for (let i = 0; i < polygonsToAdd; i++) {
            newPolygons.push(createPolygon());
          }
          
          return [...prevPolygons, ...newPolygons];
        }
        return prevPolygons;
      });
    }, 1000);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      clearInterval(addNewPolygonsInterval);
    };
  }, [dimensions]);

  const handleBreakPolygon = (id, points, position, size) => {
    setPolygons(prevPolygons => {
      return prevPolygons.filter(p => p.id !== id);
    });
    
  
    const fragmentCount = 3 + Math.floor(Math.random() * 4);
    const newFragments = [];
    
    for (let i = 0; i < fragmentCount; i++) {
      const fragmentSize = size * 0.4;
      const fragmentPointCount = Math.floor(3 + Math.random() * 4);
      
      const fragment = {
        id: `fragment-${nextId}-${i}`,
        points: createIrregularPolygon(fragmentSize, fragmentPointCount),
        position: {
          x: position.x,
          y: position.y,
          rotation: Math.random() * 360
        },
        speed: {
          x: (Math.random() - 0.5) * 2.5,
          y: (Math.random() - 0.5) * 2.5,
          rotation: (Math.random() - 0.5) * 5
        },
        size: fragmentSize,
        createdAt: Date.now(),
        canRecombine: false,
        recombineDelay: 2000 + Math.random() * 3000
      };
      
      newFragments.push(fragment);
    }
    
    setFragments(prev => [...prev, ...newFragments]);
    setNextId(prev => prev + 1);
    
 
    setTimeout(() => {
      setPolygons(prevPolygons => {
        return [...prevPolygons, createPolygon()];
      });
    }, 1000);
  };
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        className="cursor-pointer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
      
        {polygons.map(polygon => (
          <Polygon
            key={polygon.id}
            id={polygon.id}
            points={polygon.points}
            position={polygon.position}
            speed={polygon.speed}
            size={polygon.size}
            onBreak={handleBreakPolygon}
            lifespan={polygon.lifespan}
          />
        ))}
        
    
        {fragments.map(fragment => (
          <polygon
            key={fragment.id}
            points={fragment.points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="0.7"
            style={{
              transform: `translate(${fragment.position.x}px, ${fragment.position.y}px) rotate(${fragment.position.rotation}deg)`,
            }}
            className="transition-transform duration-300"
          />
        ))}
      </svg>
    </div>
  );
}