// src/components/AuthForm.js
import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const AuthForm = ({ title, fields, handleSubmit }) => {
    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{ marginBottom: 2 }}
                >
                    {title}
                </Typography>
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <TextField
                            key={index}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label={field.label}
                            type={field.type}
                            onChange={field.onChange}
                            required
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: 'text.primary',
                                },
                            }}
                        />
                    ))}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 3 }}
                    >
                        {title}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AuthForm;
