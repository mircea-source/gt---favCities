import { useEffect, useState } from 'react';
import { List, Card, message } from 'antd';
import Link from 'next/link'; 
import NavBar from '../components/NavBar';
import styles from '../styles/page.module.css';
import { supabase } from '../../lib/supabase';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('*');

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

  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <h1>Favorites Cities</h1>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={favorites}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <Link href={`/city?id=${item.id}`}>
                    {item.city}
                  </Link>
                }
              >
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