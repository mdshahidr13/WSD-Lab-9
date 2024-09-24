import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      axios.get('https://picsum.photos/v2/list?page=1&limit=10')
        .then((response) => {
          setImages(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      ) : (
        <div>
          {loading && <p>Loading images...</p>}
          {error && <p>Error loading images: {error}</p>}
          <div className="image-gallery">
            {images.map((image) => (
              <div key={image.id} className="image-item">
                <img
                  src={image.download_url}
                  alt={image.author}
                  className="image"
                />
                <p>By: {image.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
