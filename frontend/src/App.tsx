import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Posts from './components/Posts';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('/api/message') // Assuming your backend endpoint is '/api/message'
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.message); // Assuming your backend returns { message: 'Your message here' }
      })
      .catch(error => {
        console.error('There was a problem fetching the message:', error);
      });
  }, []);

  return (
    <div>
      <h1>Messages from Backend</h1>
      <p>{message}</p>
      <Router>
      <Routes>
        <Route  path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<Posts/>} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;