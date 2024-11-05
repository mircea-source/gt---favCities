import { Menu } from 'antd';
import Link from 'next/link';
import { HomeOutlined, SearchOutlined, StarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <Menu mode="horizontal" className={styles.nav}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="search" icon={<SearchOutlined />}>
        <Link href="/search">Search</Link>
      </Menu.Item>
      <Menu.Item key="city" icon={<InfoCircleOutlined />}>
        <Link href="/city">City Page</Link>
      </Menu.Item>
      <Menu.Item key="favorites" icon={<StarOutlined />}>
        <Link href="/favorites">Favorites</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;