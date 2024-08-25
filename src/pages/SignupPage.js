// src/pages/SignupPage.js
import React from 'react';
import SignupForm from '../components/SignupForm';
import { Container, Typography, Box, Paper } from '@mui/material';

const SignupPage = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #64b5f6, #1976d2)',
            }}
        >
            <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, width: 1, maxWidth: 400 }}>
                <Typography variant="h4" component="h1" sx={{ marginBottom: 3, textAlign: 'center', color: '#0d47a1' }}>
                    Create Account
                </Typography>
                <SignupForm />
            </Paper>
        </Box>
    );
};

export default SignupPage;
