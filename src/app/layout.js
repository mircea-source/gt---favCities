import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata = {
  title: "Favorite Cities",
  description: "Search for your favorite cities",
};

export default function RootLayout({ items }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{items}</AntdRegistry>
      </body>
    </html>
  );
}