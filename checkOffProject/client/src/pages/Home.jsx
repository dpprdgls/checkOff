

// pages/Home.jsx
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [photoError, setPhotoError] = useState(null);

  useEffect(() => {
    // Fetch a random quote
    console.log('Environment Variables:', import.meta.env);
    const fetchQuote = async () => {
      try {
        setQuoteLoading(true);

        

        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/quotes'));
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

    // Fetch a random photo from Unsplash
    const fetchPhoto = async () => {
      try {
        setPhotoLoading(true);

        // const accessKey = import.meta.env.UNSPLASH_ACCESS_KEY;
        // console.log('accesskey:', accessKey);

        const response = await fetch(
          `https://api.unsplash.com/photos/random?client_id=NKgnGHHcNj8NmbbRb4vs5NAcx1V5CNYvq4OPmGXh_uk`
        ); // Replace with your Unsplash access key
        if (!response.ok) throw new Error('Failed to fetch photo');

        const data = await response.json();
        setPhoto(data.urls.regular); // Use the regular URL for the image
      } catch (error) {
        setPhotoError(error.message);
      } finally {
        setPhotoLoading(false);
      }
    };

    fetchQuote();
    fetchPhoto();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Task Manager</h1>
      <div className="my-4">
        {photoLoading ? (
          <p>Loading photo...</p>
        ) : photoError ? (
          <p>Error fetching photo: {photoError}</p>
        ) : (
          <img
            src={photo}
            alt="Random from Unsplash"
            className="w-40 h-40 object-cover rounded-full shadow-md"
          />
        )}
      </div>
      {quoteLoading && <p>Loading quote...</p>}
      {quoteError && <p>Error fetching quote: {quoteError}</p>}
      {quote && (
        <blockquote className="mt-4 text-lg italic">
          <p>"{quote.q}"</p>
          <footer className="mt-2">- {quote.a}</footer>
        </blockquote>
      )}
    </div>
  );
};

export default Home;