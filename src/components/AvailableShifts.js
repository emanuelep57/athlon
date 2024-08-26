import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    useTheme,
    LinearProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dayjs from 'dayjs';

const groupShiftsByDay = (shifts) => {
    return shifts.reduce((grouped, shift) => {
        const date = dayjs(shift.date).format('dddd, MMMM D, YYYY');
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(shift);
        return grouped;
    }, {});
};

const AvailableShifts = ({ shifts, handleBooking }) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const groupedShifts = groupShiftsByDay(shifts);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ marginY: 4 }}>
            {Object.keys(groupedShifts).map((date, index) => (
                <Accordion
                    key={date}
                    expanded={expanded === index}
                    onChange={handleAccordionChange(index)}
                    sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: 'none',
                        backgroundColor: theme.palette.background.default,
                        '&:before': {
                            display: 'none',
                        },
                        '&:not(:last-child)': {
                            marginBottom: theme.spacing(2),
                        },
                        borderRadius: '0px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            padding: theme.spacing(1.5),
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            transition: 'all 0.3s ease',
                            '& .MuiTypography-root': {
                                fontSize: '1rem',
                                fontWeight: 500,
                            },
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}
                    >
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleIcon
                                sx={{
                                    color: theme.palette.success.main,
                                    marginRight: 1,
                                }}
                            />
                            {date}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: theme.spacing(2) }}>
                        {groupedShifts[date].map((shift) => (
                            <Box
                                key={shift.shift_id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingY: theme.spacing(1),
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                    '&:last-child': {
                                        borderBottom: 'none',
                                    },
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700, color: theme.palette.text.primary }}
                                    >
                                        {shift.start_time} - {shift.end_time}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        sx={{ fontWeight: 400 }}
                                    >
                                        Max: {shift.max_capacity}, Current: {shift.current_capacity}
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(shift.current_capacity / shift.max_capacity) * 100}
                                        sx={{ width: '100%', height: '6px', borderRadius: 3, marginTop: 1 }}
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleBooking(shift.shift_id)}
                                    disabled={shift.current_capacity >= shift.max_capacity}
                                    sx={{
                                        marginLeft: theme.spacing(2),
                                        fontSize: '0.75rem',
                                        padding: '4px 12px',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.dark,
                                        },
                                        '&:disabled': {
                                            backgroundColor: theme.palette.error.light,
                                            color: theme.palette.error.contrastText,
                                        },
                                    }}
                                >
                                    {shift.current_capacity >= shift.max_capacity ? 'Full' : 'Book'}
                                </Button>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

AvailableShifts.propTypes = {
    shifts: PropTypes.arrayOf(
        PropTypes.shape({
            shift_id: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            start_time: PropTypes.string.isRequired,
            end_time: PropTypes.string.isRequired,
            max_capacity: PropTypes.number.isRequired,
            current_capacity: PropTypes.number.isRequired,
        })
    ).isRequired,
    handleBooking: PropTypes.func.isRequired,
};

export default AvailableShifts;
