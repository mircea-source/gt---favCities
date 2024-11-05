import NavBar from '../components/NavBar';
import styles from './page.module.css';

export default function Favorites() {
  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <h1>Favorites Page</h1>
      </main>
    </div>
  );
}