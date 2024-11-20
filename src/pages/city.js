import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { message, Button } from 'antd';
import NavBar from '../components/NavBar';
import styles from '../styles/page.module.css';
import { supabase } from '../../lib/supabase';

export default function CityPage() {
  const router = useRouter();
  const { id } = router.query;
  const [cityDetails, setCityDetails] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCityDetails = async () => {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${id}`;
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
          setCityDetails(data.data);
        } catch (error) {
          console.error(error);
          message.error('Failed to fetch city details');
        }
      };

      fetchCityDetails();
    }
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!cityDetails) return;

    const { city, country, population, region } = cityDetails;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{ city, country, population, region }]);

      if (error) {
        throw error;
      }

      message.success('City added to favorites');
    } catch (error) {
      console.error(error);
      message.error('Failed to add city to favorites');
    }
  };

  if (!cityDetails) {
    return (
      <div className={styles.page}>
        <NavBar />
        <p>No search in progress.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <h1>{cityDetails.city}</h1>
        <p>Country: {cityDetails.country}</p>
        <p>Population: {cityDetails.population}</p>
        <p>Region: {cityDetails.region}</p>
        <Button type="primary" onClick={handleAddToFavorites}>
          Add to Favorites
        </Button>
      </main>
    </div>
  );
}