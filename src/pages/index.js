import { useState, useEffect } from 'react';
import { Input, List, Card, message } from 'antd';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';
import styles from '../styles/page.module.css';
import { supabase } from '../../lib/supabase';

const { Search } = Input;

export default function Home() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .limit(5);

        if (error) {
          throw error;
        }

        setFavorites(data);
      } catch (error) {
        console.error(error);
        message.error('Failed to fetch favorite cities');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleSearch = (value) => {
    if (value) {
      router.push(`/search?query=${value}`);
    }
  };

  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <h1>Home Page</h1>
        
        <h2>Search</h2>
        <Search
          placeholder="Enter city name..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          style={{ width: 400, marginBottom: 20 }}
        />

        <h2>Favorite Cities</h2>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={favorites}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.city}>
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