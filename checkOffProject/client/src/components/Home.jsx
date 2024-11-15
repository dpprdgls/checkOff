

// export default Home;

// Home.jsx
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setQuoteLoading(true);
        const response = await fetch(
          'https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/quotes')
        );
        if (!response.ok) throw new Error('Failed to fetch quote');
        
        const data = await response.json();
        const quotes = JSON.parse(data.contents);
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
      } catch (error) {
        setQuoteError(error.message);
      } finally {
        setQuoteLoading(false);
      }
    };
    fetchQuote();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow items-center justify-center flex-col pt-6 pb-10'>
        <div>
          <h1>Welcome to Your Task Manager</h1>
          {quoteLoading && <p>Loading quote...</p>}
          {quoteError && <p>Error fetching quote: {quoteError}</p>}
          {quote && (
            <blockquote>
              <p>{quote.q}</p>
              <footer>- {quote.a}</footer>
            </blockquote>
          )}
          </div>
      </div>
    </div>
  );
};

export default Home;