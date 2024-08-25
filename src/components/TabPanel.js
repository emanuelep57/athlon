import React from 'react';
import { Box, Typography } from '@mui/material';

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {/* Assicuriamoci che Typography usi un tag div */}
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export default TabPanel;
