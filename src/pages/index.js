import { useState, useEffect } from 'react';
import { List, Button, message } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { EnvironmentOutlined } from '@ant-design/icons';
import NavBar from '../components/NavBar';
import styles from '../styles/page.module.css';
import { supabase } from '../../lib/supabase';

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!MAPS_API_KEY) {
  console.error('Google Maps API key is not defined in environment variables');
}

function Home(props) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const router = useRouter();

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      message.error('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        message.success('Location obtained successfully');
        setLocationLoading(false);
      },
      (error) => {
        console.error(error);
        message.error('Failed to get your location');
        setLocationLoading(false);
      }
    );
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .order('id', { ascending: false })
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

  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <h1>Home Page</h1>
        
        <Button 
          type="primary" 
          icon={<EnvironmentOutlined />}
          loading={locationLoading}
          onClick={getUserLocation}
          style={{ marginBottom: 20 }}
        >
          Get My Location
        </Button>

        {userLocation && (
      <>
        <p style={{ marginBottom: 10 }}>
          Your location: {userLocation.latitude.toFixed(4)}°N, {userLocation.longitude.toFixed(4)}°E
        </p>
        <div style={{ height: '300px', width: '80%', marginBottom: 20, position: 'relative' }}>
          <Map
            google={props.google}
            zoom={14}
            initialCenter={{
              lat: userLocation.latitude,
              lng: userLocation.longitude
            }}
          >
            <Marker
              position={{
                lat: userLocation.latitude,
                lng: userLocation.longitude
              }}
            />
          </Map>
        </div>
      </>
    )}
        
        <Link href="/search">
          <Button type="primary" size="large" style={{ marginBottom: 20 }}>
            Search Cities
          </Button>
        </Link>

        <h3>Recent Favorites</h3>
        <List
          size="small"
          bordered
          dataSource={favorites}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <b>{item.city}</b> - {item.country} ({item.population} people)
            </List.Item>
          )}
        />
      </main>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
})(Home);