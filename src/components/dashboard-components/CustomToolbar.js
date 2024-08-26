import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';
import moment from "moment";

const CustomToolbar = ({ currentDate, handleNavigate, currentView }) => {
    const formatDate = () => {
        switch (currentView) {
            case 'month':
                return moment(currentDate).format('MMMM YYYY');
            case 'week':
            case 'agenda': {
                // Added block scope with curly braces
                const startOfWeek = moment(currentDate).startOf('week');
                const endOfWeek = moment(currentDate).endOf('week');
                return `${startOfWeek.format('DD MMM')} - ${endOfWeek.format('DD MMM YYYY')}`;
            }
            case 'day':
                return moment(currentDate).format('DD MMMM YYYY');
            default:
                return moment(currentDate).format('MMMM YYYY');
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '0 10px',
            marginBottom: '10px',
        }}>
            <IconButton onClick={() => handleNavigate('today')} aria-label="Today" sx={{ color: '#4CAF50' }}>
                <TodayIcon />
            </IconButton>
            <Typography sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#0288D1',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
            }}>
                {formatDate()}
            </Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <IconButton onClick={() => handleNavigate('back')} aria-label="Back" sx={{ color: '#0288D1' }}>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={() => handleNavigate('next')} aria-label="Next" sx={{ color: '#0288D1' }}>
                    <ChevronRightIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

CustomToolbar.propTypes = {
    currentDate: PropTypes.instanceOf(Date).isRequired,
    handleNavigate: PropTypes.func.isRequired,
    currentView: PropTypes.string.isRequired,
};

export default CustomToolbar;
