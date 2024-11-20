# FavCities

This is a [Next.js](https://nextjs.org) project where users can search for cities, view information about them, and save them to their favorites. The project uses Ant Design for UI components.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project has the following structure:

```
gt---favcities/
├── lib/
│   └── auth.js
├── pages/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth].js
│   ├── auth/
│   │   └── signin.js
│   ├── _app.js
│   └── index.js
├── components/
│   └── NavBar.js
├── styles/
│   └── globals.css
│   └── page.module.css
├── .env.local
└── package.json
```

## Pages

- **Home Page**: The main landing page.
- **Search Page**: Allows users to search for cities.
- **City Page**: Displays information about a specific city.
- **Favorites Page**: Shows a list of favorite cities saved by the user.

## Dependencies

- `next`: The Next.js framework.
- `react`: React library.
- `react-dom`: React DOM library.
- `antd`: Ant Design for UI components.
- `@ant-design/nextjs-registry`: Integration of Ant Design with Next.js.
- `next-transpile-modules`: To transpile ESM modules.

## Learn More

To learn more about Next.js and Ant Design, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Ant Design Documentation](https://ant.design/docs/react/introduce) - Learn about Ant Design components and usage.

## Workout

This project is a workout for JavaScript module of Generatia Tech initiative.