import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { TextField } from '@material-ui/core';

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
      width: theme.spacing(50),
      //   height: theme.spacing(10),
    },
  },
}));

export default function EditTitle(props) {
  const { handleSave, open, handleClose, value, setValue } = props;

  useState(() => {}, [open, value.title]);

  const handleOnChange = (event) => {
    setValue({ ...value, 'title': event.target.value });
  };

  const classes = useStyles();

  return (
    <Grid container direction="column">
      <div>
        <Backdrop className={classes.backdrop} open={open.title}>
          <Paper className={classes.root}>
            <div style={{ padding: 20 }}>
              <Typography variant="h5">Edit Project Title</Typography>
              <Grid item>
                <TextField
                  id="standard-full-width"
                  label="Title"
                  fullWidth
          
                  variant="outlined"
                  value={value.title}
                  //   error={userInput.enteredTitleError.error}
                  //   helperText={userInput.enteredTitleError.message}
                  required
                  onChange={handleOnChange}
                />
              </Grid>
            </div>
            <Box textAlign="right" padding={2}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                style={{
                  marginLeft: 10,
                  backgroundColor: '#FF6500',
                  color: 'white',
                }}
              >
                <SaveOutlinedIcon fontSize='small' /> Save
              </Button>
            </Box>
          </Paper>
        </Backdrop>
      </div>
    </Grid>
  );
}
