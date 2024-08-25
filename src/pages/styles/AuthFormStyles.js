
import { makeStyles } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    box: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
title: {
    marginBottom: theme.spacing(2),
},
submit: {
    marginTop: theme.spacing(3),
},
}));

export default useStyles;
