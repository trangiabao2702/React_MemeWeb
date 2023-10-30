import { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/cards/cards';
import Navbar from './components/navbar/navbar';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePhotos, setVisiblePhotos] = useState(12); // Number of photos to display initially
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('YOUR_API_ENDPOINT');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setVisiblePhotos(12);
  };

  const handleLoadMore = () => {
    setVisiblePhotos((prevVisiblePhotos) => prevVisiblePhotos + 12);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleData = filteredData.slice(0, visiblePhotos);

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      <Cards 
        data={filteredData} 
        visiblePhotos={visiblePhotos}
        totalPhotos={filteredData.length}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
