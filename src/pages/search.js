import NavBar from '../components/NavBar';
import styles from './page.module.css';

export default function Search() {
  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <h1>Search Page</h1>
      </main>
    </div>
  );
}