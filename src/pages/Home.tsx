import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

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
      <button style={styles.button} onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex' as 'flex', // Explicit type
    flexDirection: 'column' as 'column', // Explicit type
    alignItems: 'center' as 'center', // Explicit type
    justifyContent: 'center' as 'center', // Explicit type
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f4f7fc',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center' as 'center', // Fixed type for textAlign
    margin: 0,
  },
  headerContainer: {
    marginBottom: '40px',
  },
  heading: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.5',
    maxWidth: '600px',
    margin: '0 auto',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '18px',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Home;
