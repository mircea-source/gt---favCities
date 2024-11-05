import { StrictMode } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <AntdRegistry>
        <Component {...pageProps} />
      </AntdRegistry>
    </StrictMode>
  );
}