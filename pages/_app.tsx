import '../styles/globals.css';
import type { AppProps } from 'next/app'
import { lightTheme } from '../themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { Workbox } from 'workbox-window';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (
      !("serviceWorker"in navigator) ||
      process.env.NODE_ENV !== "production"
    ) {
      console.warn("Progressive Web App support is disabled");
      return;
    }
    const wb = new Workbox("/sw.js", { scope: "/" });
    wb.register();
  }, []);

  return (
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
