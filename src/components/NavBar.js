import { Menu } from 'antd';
import Link from 'next/link';
import { HomeOutlined, SearchOutlined, StarOutlined, InfoCircleOutlined } from '@ant-design/icons';

const items = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: <Link href="/">Home</Link>,
  },
  {
    key: 'search',
    icon: <SearchOutlined />,
    label: <Link href="/search">Search</Link>,
  },
  {
    key: 'city',
    icon: <InfoCircleOutlined />,
    label: <Link href="/city">City Page</Link>,
  },
  {
    key: 'favorites',
    icon: <StarOutlined />,
    label: <Link href="/favorites">Favorites</Link>,
  },
];

const NavBar = () => {
  return (
    <Menu mode="horizontal" items={items} />
  );
};

export default NavBar;