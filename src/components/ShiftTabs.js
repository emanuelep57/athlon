import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ShiftTabs = ({ tabIndex, handleTabChange }) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="shift tabs">
                <Tab label="Available Shifts" {...a11yProps(0)} />
                <Tab label="Your Bookings" {...a11yProps(1)} />
            </Tabs>
        </Box>
    );
};

ShiftTabs.propTypes = {
    tabIndex: PropTypes.number.isRequired,
    handleTabChange: PropTypes.func.isRequired,
};

export default ShiftTabs;
