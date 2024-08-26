import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, LinearProgress } from '@mui/material';

const CustomEventComponent = ({ event, view }) => {
    const { current_capacity, max_capacity } = event;
    const fillPercentage = (current_capacity / max_capacity) * 100;

    const isWeekView = view === 'week';
    const isDayView = view === 'day';
    const isAgendaView = view === 'agenda';

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isWeekView ? 'space-between' : 'center',
        alignItems: 'center',
        backgroundColor: isWeekView || isDayView ? 'transparent' : '#E3F2FD',
        borderRadius: isWeekView || isDayView ? '0' : '8px',
        padding: isWeekView ? '2px 8px' : '4px',
        boxShadow: isWeekView || isDayView ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.12)',
        width: isWeekView ? '90%' : '100%',
        margin: isWeekView ? '2px auto' : '0 auto',
        position: 'relative',
    };

    return (
        <Box sx={containerStyles}>
            {isWeekView && (
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#333', marginBottom: '4px' }}>
                        {current_capacity}/{max_capacity} prenotati
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={fillPercentage}
                        sx={{
                            width: '100%',
                            height: '6px',
                            borderRadius: '4px',
                            backgroundColor: '#E0E0E0',
                        }}
                    />
                </Box>
            )}

            {isDayView && (
                <>
                    <Box sx={{ textAlign: 'center', fontSize: '0.75rem', color: '#0288D1', fontWeight: 'bold' }}>
                        {current_capacity}/{max_capacity} prenotati
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={fillPercentage}
                        sx={{
                            width: '100%',
                            height: '8px',
                            borderRadius: '4px',
                            margin: '4px 0',
                            backgroundColor: '#E0E0E0',
                        }}
                    />
                </>
            )}

            {isAgendaView && (
                <>
                    <Typography sx={{ textAlign: 'center', fontSize: '0.75rem', color: '#0288D1', fontWeight: 'bold' }}>
                        {event.title}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={fillPercentage}
                        sx={{
                            width: '100%',
                            height: '8px',
                            borderRadius: '4px',
                            margin: '4px 0',
                            backgroundColor: '#E0E0E0',
                        }}
                    />
                    <Box sx={{ fontSize: '0.7rem', color: '#333' }}>
                        {current_capacity}/{max_capacity} prenotati
                    </Box>
                </>
            )}
        </Box>
    );
};

CustomEventComponent.propTypes = {
    event: PropTypes.shape({
        current_capacity: PropTypes.number.isRequired,
        max_capacity: PropTypes.number.isRequired,
        title: PropTypes.string,
    }).isRequired,
    view: PropTypes.string.isRequired,
};

export default CustomEventComponent;
