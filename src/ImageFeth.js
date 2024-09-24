import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoremPicsumImageFetcher = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=10');
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="image-gallery">
      {images.map(image => (
        <div key={image.id} className="image-item">
          <img src={image.download_url} alt={image.author} style={{ width: '300px', height: '200px' }} />
          <p>By: {image.author}</p>
        </div>
      ))}
    </div>
  );
};

export default LoremPicsumImageFetcher;
