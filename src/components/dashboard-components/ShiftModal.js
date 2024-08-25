import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Modal, Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment';
import { supabase } from '../../supabaseClient';

const ShiftModal = ({ isModalOpen, handleCloseModal, selectedShift, fetchShiftsWithBookings }) => {
    const [maxCapacity, setMaxCapacity] = useState(selectedShift?.max_capacity || 0);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (selectedShift) {
            setMaxCapacity(selectedShift.max_capacity);
            fetchBookings(selectedShift.shift_id);
        }
    }, [selectedShift]);

    const fetchBookings = async (shiftId) => {
        const { data: bookingsData, error } = await supabase
            .rpc('custom_booking_query', { shift_id_input: shiftId });

        if (error) {
            console.error('Error fetching bookings:', error);
        } else {
            setBookings(bookingsData);
        }
    };

    const handleRemoveBooking = async (bookingId) => {
        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('booking_id', bookingId);

        if (error) {
            console.error('Error removing booking:', error);
        } else {
            await fetchBookings(selectedShift.shift_id);
            fetchShiftsWithBookings();
        }
    };

    const handleUpdateShift = async () => {
        const { error } = await supabase
            .from('shifts')
            .update({ max_capacity: maxCapacity })
            .eq('shift_id', selectedShift.shift_id);

        if (error) {
            console.error('Error updating shift:', error);
        } else {
            fetchShiftsWithBookings();
            handleCloseModal();
        }
    };

    const handleDeleteShift = async () => {
        const { error } = await supabase
            .from('shifts')
            .delete()
            .eq('shift_id', selectedShift.shift_id);

        if (error) {
            console.error('Error deleting shift:', error);
        } else {
            fetchShiftsWithBookings();
            handleCloseModal();
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box sx={{
                width: '95%',
                maxWidth: '600px',
                bgcolor: '#FFFFFF',
                boxShadow: 24,
                p: 3,
                borderRadius: '10px',
                outline: 'none',
                maxHeight: '90vh',
                overflowY: 'auto',
            }}>
                {selectedShift && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {selectedShift.title}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Data: {moment(selectedShift.start).format('DD/MM/YYYY')}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Orario: {moment(selectedShift.start).format('HH:mm')} - {moment(selectedShift.end).format('HH:mm')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
                            Capacità: {selectedShift.current_capacity}/{maxCapacity}
                        </Typography>

                        <TextField
                            label="Capacità Massima"
                            type="number"
                            fullWidth
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        {/* Render the bookings list */}
                        <List sx={{ mb: 2 }}>
                            {bookings.map((booking) => (
                                <ListItem key={booking.booking_id}>
                                    {/* Access first_name and last_name directly from booking */}
                                    <ListItemText
                                        primary={`${booking.first_name} ${booking.last_name}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="remove"
                                            onClick={() => handleRemoveBooking(booking.booking_id)}
                                        >
                                            <RemoveCircleIcon color="error" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                onClick={handleUpdateShift}
                            >
                                Salva Modifiche
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteShift}
                            >
                                Elimina Turno
                            </Button>
                            <IconButton color="secondary" onClick={handleCloseModal}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default ShiftModal;
