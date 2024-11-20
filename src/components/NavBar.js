import { Menu, Switch } from 'antd';
import Link from 'next/link';
import { HomeOutlined, SearchOutlined, StarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const NavBar = () => {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light');
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  const menuItems = [
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
    // {
    //   key: 'theme-toggle',
    //   label: (
    //     <Switch
    //       checkedChildren="Dark"
    //       unCheckedChildren="Light"
    //       checked={darkMode}
    //       onChange={toggleDarkMode}
    //     />
    //   ),
    // },
    {
      key: 'auth',
      label: session ? (
        <a onClick={handleSignOut}>Sign out</a>
      ) : (
        <Link href="/auth/signin">Sign in</Link>
      ),
    },
  ];

  return <Menu mode="horizontal" items={menuItems} />;
};

export default NavBar;