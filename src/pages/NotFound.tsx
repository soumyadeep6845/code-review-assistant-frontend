import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="notfound-button">Go Home</a>
      </div>
    </div>
  );
};

export default NotFound;
