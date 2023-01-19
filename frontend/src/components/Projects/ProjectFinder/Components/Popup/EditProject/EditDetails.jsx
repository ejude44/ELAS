import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { TextField } from '@material-ui/core';
import { Faculties, Degrees, maxMembers } from '../../../reuse/reuse';
import { MenuItem } from '@material-ui/core';

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

export default function EditDetails(props) {
  const { handleSave, open, handleClose, value, setValue } = props;

  useState(() => {}, [open]);

  const handleOnChangeFac = (event) => {
    setValue({
      ...value,
      'faculty': event.target.value,
    });
  };

  const handleOnChangeDeg = (event) => {
    setValue({
      ...value,
      'degree': event.target.value,
    });
  };

  const handleOnChangeMax = (event) => {
    setValue({
      ...value,
      'maxMembers': event.target.value,
    });
  };

  const classes = useStyles();

  return (
    <Grid container direction="column">
      <div>
        <Backdrop className={classes.backdrop} open={open.details}>
          <Paper className={classes.root}>
            <div style={{ padding: 20 }}>
              <Typography variant="h5">Edit Project Details</Typography>

              <Grid item>
                <TextField
                  id="outlined-select-faculty"
                  select
                  label="Select"
                  fullWidth
                  
                  value={value.faculty}
                  onChange={handleOnChangeFac}
                  //   error={userInput.enteredFacultyError.error}
                  helperText="select faculty"
                >
                  {Faculties.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item>
                <TextField
                  id="outlined-select-degree"
                  select
                  label="Select"
                  helperText="select Degree"
                  fullWidth
                  
                  onChange={handleOnChangeDeg}
                  value={value.degree}

                  //   error={userInput.enteredDegreeError.error}
                  //   helperText={userInput.enteredDegreeError.message}
                >
                  {Degrees.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item>
                <TextField
                  id="outlined-select-max_members"
                  select
                  fullWidth
                  
                  // label="Select"
                  value={value.maxMembers}
                  onChange={handleOnChangeMax}
                  //   error={userInput.enteredMaxMembersError.error}
                  helperText="select maximum project members"
                >
                  {maxMembers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
