import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cards = ({ searchTerm }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const apiKey = 'HblQa8tI3AB6CrtlZCuHrxHnFy-ZOZ8g5toSRhJrIdA';
      const url = `https://api.unsplash.com/photos?page=${page}&query=${searchTerm}`;

      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Client-ID ${apiKey}`,
          },
        });
        setImages((prevImages) => [...prevImages, ...response.data]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [searchTerm, page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {images.map((image) => (
        <img key={image.id} src={image.urls.small} alt={image.alt_description} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Cards;
