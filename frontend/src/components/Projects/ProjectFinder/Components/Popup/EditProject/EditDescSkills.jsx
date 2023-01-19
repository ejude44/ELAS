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

export default function EditDescSkills(props) {
  const { handleSave, open, handleClose, value, setValue } = props;

  const handleOnChangeDescription = (event) => {
    setValue({
      ...value,
      'description': event.target.value,
    });
  };

  const handleOnChangeSkills = (event) => {
    setValue({
      ...value,

      'skills': event.target.value,
    });
  };

  const classes = useStyles();

  return (
    <Grid container direction="column">
      <div>
        <Backdrop className={classes.backdrop} open={open.descSkills}>
          <Paper className={classes.root}>
            <div style={{ padding: 20 }}>
              <Typography variant="h5">Edit Description and Skills</Typography>

              <Grid item>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  value={value.description}
                  rows={10}
                  variant="outlined"
                  onChange={handleOnChangeDescription}
                  // onChange={descriptionChangeHandler}
                  //   error={userInput.enteredDescriptionError.error}
                  //   helperText={userInput.enteredDescriptionError.message}
                />
              </Grid>
              <br></br>

              <Grid item>
                <TextField
                  id="standard-full-width"
                  label="Enter Skills comma separated"
                  variant="outlined"
                  fullWidth
                  value={value.skills}
                  onChange={handleOnChangeSkills}
                  //   error={userInput.enteredSkillsError.error}
                  //   helperText={userInput.enteredSkillsError.message}
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
