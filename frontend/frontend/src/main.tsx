import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
	typography: {
		fontFamily: 'Roboto Slab,serif',
		allVariants: { color: 'white' },
	},
});
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Toaster position='top-right' />
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
);
