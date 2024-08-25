
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { supabase } from '../supabaseClient';

const Header = () => {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Logout failed:', error.message);
        else window.location.href = '/login';
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'primary.main', padding: '8px 16px', boxShadow: 'none' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFF' }}>
                    Gym Booking
                </Typography>
                <IconButton onClick={handleLogout} sx={{ color: 'inherit' }}>
                    <Logout sx={{ fontSize: 24 }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;