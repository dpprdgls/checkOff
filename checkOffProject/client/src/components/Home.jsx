import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);


  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(null);


  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setQuoteLoading(true);
        // const response = await fetch('/quotes-api/api/quotes');
        // const response = await fetch('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes');
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/quotes'));
        if (!response.ok) throw new Error('Failed to fetch quote');

        const data = await response.json();
        console.log('API response:', data);
        const quotes = JSON.parse(data.contents);
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
        // if (data.length > 0) {
        //   const randomQuote = data[Math.floor(Math.random() * data.length)];
        //   setQuote(randomQuote);
        // }
      } catch (error) {
        setQuoteError(error.message);
      } finally {
        setQuoteLoading(false);
      }
    };
    fetchQuote();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Task Manager</h1>

      {!isLoggedIn ? (
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}

      <div>
        <img 
          src='/vite.svg' 
          alt="Task Manager" 
          style={{ width: '300px', height: 'auto' }} 
        />
        <p>It's working now!</p>
        </div>
        {quoteLoading && <p>Loading quote...</p>}
        {quoteError && <p>Error fetching quote: {quoteError}</p>}
        {quote && (
          <blockquote>
            <p>{quote.q}</p>
            <footer>- {quote.a}</footer>
          </blockquote>
        )}

      
    </div>
  );
};

export default Home;