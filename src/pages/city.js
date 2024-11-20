import NavBar from '../components/NavBar';
import styles from '../styles/page.module.css';

export default function City() {
  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <h1>City Page</h1>
      </main>
    </div>
  );
}