// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#003366', // Navy Blue
        },
        secondary: {
            main: '#00aaff', // Light Blue for accents
        },
        background: {
            default: '#f0f2f5', // Very light grey for background
        },
        text: {
            primary: '#333333', // Dark grey for text
            secondary: '#666666', // Medium grey for less important text
        },
    },
    shape: {
        borderRadius: 0, // Consistent rounded corners for all components
    },
    shadows: [
        'none',
        '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    ],
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', // A clean and modern font
    },
});

export default theme;
