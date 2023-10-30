import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cards = ({ searchTerm }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const apiKey = 'HblQa8tI3AB6CrtlZCuHrxHnFy-ZOZ8g5toSRhJrIdA'; // Replace with your Unsplash API key
      const url = `https://api.unsplash.com/photos?page=1&query=${searchTerm}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Client-ID ${apiKey}`,
          },
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [searchTerm]);

  return (
    <div>
      {images.map((image) => (
        <img key={image.id} src={image.urls.small} alt={image.alt_description} />
      ))}
    </div>
  );
};

export default Cards;
