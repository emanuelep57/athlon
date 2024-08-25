import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Container, Box } from '@mui/material';
import Header from '../components/Header';
import ShiftTabs from '../components/ShiftTabs';
import TabPanel from '../components/TabPanel';
import AvailableShifts from '../components/AvailableShifts';
import UserBookings from '../components/UserBookings';
import SnackbarNotification from '../components/SnackbarNotification';

const ShiftPage = () => {
    const [shifts, setShifts] = useState([]);
    const [userBookings, setUserBookings] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const user = supabase.auth.getUser();

    useEffect(() => {
        fetchShifts();
        fetchUserBookings();

        const shiftSubscription = supabase
            .channel('public:shifts')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'shifts' },
                (payload) => {
                    console.log('Shift event:', payload);
                    fetchShifts();
                }
            )
            .subscribe();

        const bookingSubscription = supabase
            .channel('public:bookings')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'bookings' },
                (payload) => {
                    console.log('Booking event:', payload);
                    fetchShifts();
                    fetchUserBookings();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(shiftSubscription);
            supabase.removeChannel(bookingSubscription);
        };
    }, []);

    const fetchShifts = async () => {
        const { data, error } = await supabase
            .from('shifts')
            .select('*')
            .order('date', { ascending: true })
            .order('start_time', { ascending: true });

        if (error) console.error(error);
        else setShifts(data);
    };

    const fetchUserBookings = async () => {
        if (user) {
            const { data, error } = await supabase
                .from('bookings')
                .select('*, shifts(*)')
                .eq('user_id', (await user).data.user.id)
                .order('booking_date', { ascending: false });

            if (error) console.error(error);
            else setUserBookings(data);
        }
    };

    const handleBooking = async (shiftId) => {
        const { error } = await supabase.from('bookings').insert([
            {
                shift_id: shiftId,
                user_id: (await user).data.user.id,
            },
        ]);

        if (error) {
            setSnackbarMessage('Booking failed.');
            setSnackbarSeverity('error');
        } else {
            setSnackbarMessage('Booking successful!');
            setSnackbarSeverity('success');
        }
        setSnackbarOpen(true);
    };

    const handleDeleteBooking = async (bookingId) => {
        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('booking_id', bookingId);

        if (error) {
            setSnackbarMessage('Failed to cancel booking.');
            setSnackbarSeverity('error');
        } else {
            setSnackbarMessage('Booking cancelled.');
            setSnackbarSeverity('success');
        }
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <Header />
            <Container sx={{ marginTop: 4 }}>
                <Box>
                    <ShiftTabs tabIndex={tabIndex} handleTabChange={handleTabChange} />
                    <TabPanel value={tabIndex} index={0}>
                        <AvailableShifts shifts={shifts} handleBooking={handleBooking} />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <UserBookings userBookings={userBookings} handleDeleteBooking={handleDeleteBooking} />
                    </TabPanel>
                </Box>
            </Container>
            <SnackbarNotification
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                handleClose={handleCloseSnackbar}
            />
        </>
    );
};

export default ShiftPage;
