import React, { useState, useEffect } from "react";
import axios from "axios";

const Cards = ({ searchTerm }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setImages([])
        setPage(1)
    }, [searchTerm])

  useEffect(() => {
    const fetchImages = async () => {
      const apiKey = "HblQa8tI3AB6CrtlZCuHrxHnFy-ZOZ8g5toSRhJrIdA";

      try {
        setLoading(true);

        let data
        if (searchTerm === "") {
          data = await axios
            .get(`https://api.unsplash.com/photos?page=${page}`, {
              headers: {
                Authorization: `Client-ID ${apiKey}`,
              },
            })
            .then((response) => response.data);
        } else {
          data = await axios
            .get(
              `https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}`,
              {
                headers: {
                  Authorization: `Client-ID ${apiKey}`,
                },
              }
            )
            .then((response) => response.data.results);
        }

        if (page > 1) {
          setImages((prevImgs) => [...prevImgs, ...data]);
        } else {
          setImages(data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {images.map((image) => (
        <img
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description}
        />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Cards;
