import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { supabase } from '../supabaseClient';
import CustomToolbar from '../components/dashboard-components/CustomToolbar';
import ViewNavigation from '../components/dashboard-components/ViewNavigation';
import CustomEventComponent from '../components/dashboard-components/CustomEventComponent';
import Header from "../components/Header";
import '../calendarStyles.css';
import ShiftModal from '../components/dashboard-components/ShiftModal'; // Import the new modal

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [shifts, setShifts] = useState([]);
    const [selectedShift, setSelectedShift] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState('month');
    const [currentDate, setCurrentDate] = useState(new Date());

    const fetchShiftsWithBookings = async () => {
        const { data: shiftsData, error: shiftsError } = await supabase.from('shifts').select('*');
        const { data: bookingsData, error: bookingsError } = await supabase.from('bookings').select('*');

        if (shiftsError || bookingsError) {
            console.error('Error fetching shifts or bookings:', shiftsError || bookingsError);
        } else {
            const shiftsWithCapacity = shiftsData.map((shift) => {
                const shiftBookings = bookingsData.filter(
                    (booking) => booking.shift_id === shift.shift_id
                );
                const startDate = moment(`${shift.date} ${shift.start_time}`, 'YYYY-MM-DD HH:mm:ss').toDate();
                const endDate = moment(`${shift.date} ${shift.end_time}`, 'YYYY-MM-DD HH:mm:ss').toDate();

                return {
                    ...shift,
                    title: 'Turno',
                    start: startDate,
                    end: endDate,
                    current_capacity: shiftBookings.length,
                    max_capacity: shift.max_capacity,
                    allDay: false,
                };
            });
            setShifts(shiftsWithCapacity);
        }
    };

    useEffect(() => {
        fetchShiftsWithBookings();
    }, []);

    const handleNavigate = (action) => {
        setCurrentDate((prevDate) => {
            if (currentView === Views.MONTH) {
                return action === 'back'
                    ? moment(prevDate).subtract(1, 'month').toDate()
                    : action === 'next'
                        ? moment(prevDate).add(1, 'month').toDate()
                        : new Date();
            } else if (currentView === Views.WEEK || currentView === Views.AGENDA) {
                return action === 'back'
                    ? moment(prevDate).subtract(1, 'week').toDate()
                    : action === 'next'
                        ? moment(prevDate).add(1, 'week').toDate()
                        : new Date();
            } else if (currentView === Views.DAY) {
                return action === 'back'
                    ? moment(prevDate).subtract(1, 'day').toDate()
                    : action === 'next'
                        ? moment(prevDate).add(1, 'day').toDate()
                        : new Date();
            }
        });
    };

    const handleSelectEvent = (shift) => {
        setSelectedShift(shift);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedShift(null);
    };

    const filteredShifts = shifts.filter((shift) =>
        moment(shift.start).isBetween(
            moment(currentDate).startOf('week'),
            moment(currentDate).endOf('week'),
            null,
            '[]'
        )
    );

    return (
        <Box>
            <Header />
            <Box sx={{
                p: 1,
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100%',
                margin: '0 auto',
                overflow: 'auto',
                marginBottom: '56px',
            }}>
                <CustomToolbar
                    currentDate={currentDate}
                    currentView={currentView}
                    handleNavigate={handleNavigate}
                />

                <Calendar
                    localizer={localizer}
                    events={filteredShifts}
                    startAccessor="start"
                    endAccessor="end"
                    view={currentView}
                    date={currentDate}
                    onNavigate={(date) => setCurrentDate(date)}
                    onView={(view) => setCurrentView(view)}
                    onSelectEvent={handleSelectEvent}
                    components={{
                        toolbar: () => null,
                        event: currentView === 'month' ? () => null : (props) => <CustomEventComponent {...props} view={currentView} />,
                    }}
                    views={['month', 'week', 'day', 'agenda']}
                    style={{ height: '100vh', width: '100%', padding: '0' }}
                    popup={true}
                    selectable={true}
                />

                <ViewNavigation currentView={currentView} handleViewChange={setCurrentView} />

                <ShiftModal
                    isModalOpen={isModalOpen}
                    handleCloseModal={handleCloseModal}
                    selectedShift={selectedShift}
                    fetchShiftsWithBookings={fetchShiftsWithBookings}
                />
            </Box>
        </Box>
    );
};

export default CalendarPage;
