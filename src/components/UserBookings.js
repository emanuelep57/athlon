import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UserBookings = ({ userBookings, handleDeleteBooking }) => (
    <Box sx={{ marginY: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Your Bookings
        </Typography>
        <Grid container spacing={2}>
            {userBookings.map((booking) => (
                <Grid item xs={12} md={6} key={booking.booking_id}>
                    <Card sx={{ borderRadius: 2, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                {new Date(booking.shifts.date).toLocaleDateString()} - {booking.shifts.start_time} to {booking.shifts.end_time}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                Shift ID: {booking.shift_id}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeleteBooking(booking.booking_id)}
                                sx={{ borderRadius: '20px' }}
                            >
                                Cancel Booking
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default UserBookings;
