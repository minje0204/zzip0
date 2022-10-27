// @ts-nocheck
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import theme from '../styles/theme';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
    
  );
}

export default MyApp;
