import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleGetStarted = () => {
    navigate('/review');
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.heading}>Welcome to AI Code Review</h1>
        <p style={styles.subheading}>
          Enhance your coding skills with intelligent feedback powered by AI. Just submit your code and get detailed insights.
        </p>
      </div>
      <button
        style={isHovered ? { ...styles.button, ...styles.buttonHovered } : styles.button}
        onClick={handleGetStarted}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? 'Get Started >>' : 'Get Started'}
      </button>
      
      {/* Copyright Notice */}
      <div style={styles.footer}>
        <p style={styles.copyright}>© 2025 Soumyadeep Das</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(to bottom right, #2c3e50, #34495e)',
    fontFamily: "'Playfair Display', serif",
    textAlign: 'center' as 'center',
    margin: 0,
  },
  headerContainer: {
    marginBottom: '40px',
    animation: 'fadeIn 0.5s ease-in',
  },
  heading: {
    fontSize: '36px',
    color: '#fff',
    marginBottom: '10px',
    fontWeight: '700',
    animation: 'fadeIn 1s ease-in',
  },
  subheading: {
    fontSize: '18px',
    color: '#fff',
    lineHeight: '1.5',
    maxWidth: '500px',
    margin: '0 auto',
    animation: 'fadeIn 1.5s ease-in',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '18px',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease',
    boxShadow: '0 0 10px rgba(76, 175, 80, 0.8)',
    animation: 'slideInTop 1s ease-out',
  },
  buttonHovered: {
    backgroundColor: '#388E3C',
    transform: 'scale(1.1)',
    boxShadow: '0 0 15px rgba(56, 142, 60, 1)',
  },
  footer: {
    position: 'absolute' as 'absolute',
    bottom: '10px',
    width: '100%',
    textAlign: 'center' as 'center',
  },
  copyright: {
    fontSize: '14px',
    color: '#fff',
    margin: '0',
  },
};

export default Home;
