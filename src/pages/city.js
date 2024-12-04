import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { message, Button, Spin, Image } from 'antd';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import styles from '../styles/page.module.css';
import { supabase } from '../../lib/supabase';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export default function CityPage() {
  const [isInFavorites, setIsInFavorites] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [cityDetails, setCityDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  const getCityImageUrl = async (cityName) => {
    try {
      const result = await unsplash.search.getPhotos({
        query: `${cityName} city landmark`,
        page: 1,
        perPage: 1,
        orientation: 'landscape'
      });

      if (result.errors) {
        console.error('Error fetching Unsplash image:', result.errors[0]);
        return 'https://via.placeholder.com/400x300?text=No+Image+Available';
      }

      const photo = result.response?.results[0];
      return photo ? photo.urls.regular : 'https://via.placeholder.com/400x300?text=No+Image+Available';
    } catch (error) {
      console.error('Error fetching Unsplash image:', error);
      return 'https://via.placeholder.com/400x300?text=No+Image+Available';
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchCityDetails = async () => {
      try {
        // First try to get data from Supabase
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('favorites')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseData) {
          setCityDetails(supabaseData);
          setIsInFavorites(true);
          const imageUrl = await getCityImageUrl(supabaseData.city);
          setImageUrl(imageUrl);
          return;
        }

        // If not in favorites, fetch from RapidAPI
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${id}`;
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '2d8c05fc21msh9b2c0e952731b0ap14cecdjsn4718408c1a1d',
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
          }
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch city details');
        }

        if (!data.data) {
          throw new Error('No city data found');
        }

        setCityDetails(data.data);
        const imageUrl = await getCityImageUrl(data.data.city);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching city:', error);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
  }, [router.isReady, id]);

  const handleAddToFavorites = async () => {
    if (!cityDetails) return;

    const { city, country, population, region } = cityDetails;

    try {
      const { error } = await supabase
        .from('favorites')
        .insert([{ city, country, population, region }]);

      if (error) {
        throw error;
      }

      message.success('City added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      message.error('Failed to add city to favorites');
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <NavBar />
        <main className={styles.main}>
          <Spin size="large" />
        </main>
      </div>
    );
  }

  if (!cityDetails) {
    return (
      <div className={styles.page}>
        <NavBar />
        <main className={styles.main}>
          <p>City not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
      <Image
          width={400}
          height={300}
          src={imageUrl || 'https://via.placeholder.com/400x300?text=Loading...'}
          alt={`${cityDetails.city} landmark`}
          fallback="https://via.placeholder.com/400x300?text=No+Image+Available"
          style={{ marginBottom: 20, borderRadius: 8 }}
        />
        <h1>{cityDetails.city}</h1>
        <p>Country: {cityDetails.country}</p>
        <p>Population: {cityDetails.population}</p>
        <p>Region: {cityDetails.region}</p>
        <p>&nbsp;</p>
        {isInFavorites ? (
          <Link href="/favorites">
            <Button type="primary">
              Back to Favorites
            </Button>
          </Link>
        ) : (
          <Button type="primary" onClick={handleAddToFavorites}>
            Add to Favorites
          </Button>
        )}
      </main>
    </div>
  );
}