import React from 'react';
import {Box, Tab, Tabs} from '@mui/material';

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

export default ShiftTabs;
