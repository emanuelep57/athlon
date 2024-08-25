// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ShiftsPage from './pages/ShiftsPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalendarPage from "./pages/CalendarPage";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blu cielo
        },
        secondary: {
            main: '#ffc107', // Giallo dorato
        },
        background: {
            default: '#f5f5f5', // Grigio chiaro
            paper: '#ffffff', // Bianco per i componenti su sfondo
        },
        text: {
            primary: '#0d47a1', // Testo principale blu scuro
            secondary: '#424242', // Testo secondario grigio scuro
        },
    },
    shape: {
        borderRadius: 12, // Bordi leggermente arrotondati
    },
    shadows: [
        'none',
        '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',  // 1
        '0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)',  // 2
        '0px 1px 8px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.24)',  // 3
        '0px 2px 4px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.24)',  // 4
        '0px 3px 5px rgba(0, 0, 0, 0.12), 0px 5px 8px rgba(0, 0, 0, 0.24)',  // 5
        '0px 3px 6px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.24)', // 6
        '0px 4px 7px rgba(0, 0, 0, 0.12), 0px 7px 10px rgba(0, 0, 0, 0.24)', // 7
        '0px 5px 8px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.24)', // 8
        '0px 6px 10px rgba(0, 0, 0, 0.12), 0px 9px 12px rgba(0, 0, 0, 0.24)',// 9
        '0px 6px 12px rgba(0, 0, 0, 0.12), 0px 10px 14px rgba(0, 0, 0, 0.24)',// 10
        // Puoi continuare a definire ulteriori ombre se necessario
    ],
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', // Font moderno e pulito
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/shifts" element={<ShiftsPage />} />
                    <Route path="/admin-dashboard" element={<CalendarPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
