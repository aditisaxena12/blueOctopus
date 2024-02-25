import React, { useState, useEffect } from 'react';

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
    </div>
  );
};

export default App;