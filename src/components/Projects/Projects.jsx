import React from 'react';
import './Projects.css';

const projects = [
  {
    title: "Proactive Threat Hunter",
    description: "AI-driven real-time network threat detection and automated response system integrated with SIEM tools.",
    features: [
      "Real-time network traffic monitoring using Kafka",
      "Machine learning-based anomaly detection",
      "Automated threat response (e.g., IP blocking)",
      "Seamless integration with SIEM tools like Splunk and ELK",
      "High detection accuracy and low response latency"
    ],
    techStack: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikit-learn/scikit-learn-original.svg" },
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "Apache Kafka", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
      { name: "Splunk", logo: "" },
      { name: "ELK", logo: "" }
    ]
  },
  {
    title: "Recipe Genie",
    description: "AI-powered recipe recommendation web app personalized to user preferences and available ingredients.",
    features: [
      "Ingredient-based recipe search",
      "Personalized suggestions using user history/preferences",
      "Nutrition facts and dietary filters (vegan, keto, etc.)",
      "Save and share favorite recipes",
      "Clean and responsive UI"
    ],
    techStack: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Spoonacular API", logo: "" },
      { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" }
    ]
  },
  {
    title: "Hybrid Defence Mechanism",
    description: "Robust fraud detection system combining adversarial training and anomaly detection to defend against data poisoning attacks.",
    features: [
      "Adversarial training using FGSM to improve model robustness",
      "Autoencoder-based anomaly detection",
      "Transaction risk-level categorization",
      "Reconstruction error monitoring",
      "Enhanced resilience against poisoned and fraudulent data"
    ],
    techStack: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "Scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikit-learn/scikit-learn-original.svg" }
    ]
  }
];

const Projects = () => {
  // Add font imports for tech-oriented fonts
  React.useEffect(() => {
    const linkJetBrains = document.createElement('link');
    linkJetBrains.rel = 'stylesheet';
    linkJetBrains.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    
    const linkOutfit = document.createElement('link');
    linkOutfit.rel = 'stylesheet';
    linkOutfit.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap';
    
    const linkSpaceMono = document.createElement('link');
    linkSpaceMono.rel = 'stylesheet';
    linkSpaceMono.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap';
    
    document.head.appendChild(linkJetBrains);
    document.head.appendChild(linkOutfit);
    document.head.appendChild(linkSpaceMono);
    
    return () => {
      document.head.removeChild(linkJetBrains);
      document.head.removeChild(linkOutfit);
      document.head.removeChild(linkSpaceMono);
    };
  }, []);

  return (
    <div className="cards-container">
      {projects.map((project, index) => (
        <div className="flip-card" key={index}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
            <div className="flip-card-back">
              <h3>Features</h3>
              <ul>
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <h3>Tech Stack</h3>
              <div className="tech-stack">
                {project.techStack.map((tech, i) => (
                  <div className="tech" key={i}>
                    {tech.logo && <img src={tech.logo} alt={tech.name} />}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;