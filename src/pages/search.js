import { Input, List, Card, message } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import styles from '../styles/page.module.css';

const { Search } = Input;

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async (searchValue) => {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchValue}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '2d8c05fc21msh9b2c0e952731b0ap14cecdjsn4718408c1a1d',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch cities');
      return [];
    }
  };

  const handleSearch = async (value) => {
    if (!value) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const citiesData = await fetchCities(value);
      setResults(citiesData);
    } catch (error) {
      console.error(error);
      message.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <h1>Search Cities</h1>
        
        <Search
          placeholder="Enter city name..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
          loading={loading}
          style={{ width: 400, marginBottom: 20 }}
        />

        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={results}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <Card title={<Link href={`/city?id=${item.id}`}>{item.city}</Link>}>
                <p>Country: {item.country}</p>
                <p>Population: {item.population}</p>
                <p>Region: {item.region}</p>
              </Card>
            </List.Item>
          )}
        />
      </main>
    </div>
  );
}