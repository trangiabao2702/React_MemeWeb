import React, { useEffect, useRef } from "react";

const Cards = (props) => {
  const { data, visiblePhotos, totalPhotos, onLoadMore, isLoading } = props;
  const bottomRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (
        bottomRef.current &&
        bottomRef.current.getBoundingClientRect().top <= window.innerHeight
      ) {
        onLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]);

  return (
    <div>
      {data.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}

      {isLoading && <p>Loading...</p>}

      {visiblePhotos < totalPhotos && !isLoading && (
        <div ref={bottomRef}>Scroll down to load more photos</div>
      )}
    </div>
  );
};

export default Cards;
