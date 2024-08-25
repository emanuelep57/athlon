import React from 'react';
import LoginForm from '../components/LoginForm';
import { Container, Typography, Box, Paper } from '@mui/material';

const LoginPage = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #6D83F2, #A7A8F9)',
            }}
        >
            <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, width: 1, maxWidth: 400 }}>
                <Typography variant="h4" component="h1" sx={{ marginBottom: 3, textAlign: 'center' }}>
                    Welcome Back!
                </Typography>
                <LoginForm />
            </Paper>
        </Box>
    );
};

export default LoginPage;
