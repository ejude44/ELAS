import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      // width: theme.spacing(30),
      height: theme.spacing(10),
    },
  },
}));

export default function ConfirmDelete(props) {
  const { handleYes, open, handleClose } = props;

  const classes = useStyles();

  //   const [open, setOpen] = React.useState(true);

  return (
    <Grid container direction="column">
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Paper className={classes.root}>
          <Grid item style={{ padding: 10 }}>
            <Typography variant="h5" gutterBottom
            >
              Do you want to Delete this Project ?
            </Typography>
            <Typography variant="subtitle2">
              Once you click delete, This Project will be Deleted Permanently.
            </Typography>
          </Grid>
          <Box textAlign="right" padding={2}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleYes}
              style={{
                marginLeft: 10,
                backgroundColor: 'red',
                color: 'white',
              }}
            >
              Yes, Delete
            </Button>
          </Box>
        </Paper>
      </Backdrop>
    </Grid>
  );
}
