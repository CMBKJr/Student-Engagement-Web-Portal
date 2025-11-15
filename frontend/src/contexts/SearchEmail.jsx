import React, { useState, useEffect } from 'react';

const searchEmail = ({ emailID }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items/${itemId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEmail(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [emailID]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!email) {
    return <div>Email not found.</div>;
  }

  return (
    <div>
      <h1>{email.name}</h1>
    </div>
  );
};

export default searchEmail;

