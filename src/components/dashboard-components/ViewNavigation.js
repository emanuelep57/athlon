import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';

const ViewNavigation = ({ currentView, handleViewChange }) => (
    <BottomNavigation
        sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            paddingBottom: 1,
            borderTop: '1px solid #E0E0E0',
        }}
        value={currentView}
        onChange={(event, newValue) => handleViewChange(newValue)}
    >
        <BottomNavigationAction label="Mese" value="month" icon={<CalendarMonthIcon sx={{ fontSize: '2rem' }} />} />
        <BottomNavigationAction label="Settimana" value="week" icon={<ViewWeekIcon sx={{ fontSize: '2rem' }} />} />
        <BottomNavigationAction label="Giorno" value="day" icon={<ViewDayIcon sx={{ fontSize: '2rem' }} />} />
        <BottomNavigationAction label="Agenda" value="agenda" icon={<ViewAgendaIcon sx={{ fontSize: '2rem' }} />} />
    </BottomNavigation>
);

export default ViewNavigation;
