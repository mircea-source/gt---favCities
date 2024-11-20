import NavBar from '../components/NavBar';
import styles from '../styles/page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <h1>Home Page</h1>
      </main>
    </div>
  );
}