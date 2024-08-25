// src/components/SignupForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import { supabase } from '../supabaseClient';
import { Typography, Box } from '@mui/material';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { first_name: firstName, last_name: lastName },
            },
        });
        if (error) alert(error.message);
        else alert('Signup successful!');
    };

    return (
        <>
            <AuthForm
                title="Sign Up"
                fields={[
                    { label: 'First Name', type: 'text', onChange: (e) => setFirstName(e.target.value) },
                    { label: 'Last Name', type: 'text', onChange: (e) => setLastName(e.target.value) },
                    { label: 'Email', type: 'email', onChange: (e) => setEmail(e.target.value) },
                    { label: 'Password', type: 'password', onChange: (e) => setPassword(e.target.value) },
                ]}
                handleSubmit={handleSubmit}
            />
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Typography variant="body2">
                    Already have an account? <Link to="/login">Login</Link>
                </Typography>
            </Box>
        </>
    );
};

export default SignupForm;
