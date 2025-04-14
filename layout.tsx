import './globals.css';
import Layout from './components/Layout';

export const metadata = {
  title: 'TrainGPT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}