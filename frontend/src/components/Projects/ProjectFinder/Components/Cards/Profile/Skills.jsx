import {
  Box,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Tooltip } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { skills } from '../../../reuse/reuse';
import Chip from '@material-ui/core/Chip';
import { CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import customClasses from './../../../Css/Input.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',

    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      // width: theme.spacing(30),
      height: theme.spacing(35),
    },
  },
  saveSkills: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
    verticalAlign: 'text-bottom',
    marginTop: 50,
  },
  profileSkills: {
    fontWeight: 700,
    fontSize: 22,
    fontFamily: 'Roboto',
    font: 'Roboto',
    color: '#000000',
    lineHeight: 1.5,
  },
  skillsBox: {
    backgroundColor: 'transparent',
    border: 0,
    borderColor: ' #303f9f',
    width: '100%',
  },
}));

export default function Skills({ props }) {
  const classes = useStyles();
  const [hideButton, setHideButton] = useState(true);

  const { setValue, value, handleSave, status, setStatus } = props;
  const [mySkills, setMySkills] = useState();

  const onChange = (event, skills) => {
    // setValue({ ...value, 'skills': event.target.value });
    setValue({ ...value, 'skills': skills });

    setHideButton(false);
    setStatus('save');
  };
  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === '') {
      return;
      // setValue(value.skills);
    } else {
      setValue({ ...value, 'skills': event.target.value });
    }
    // setHideButton(true)
  };

  useEffect(() => {
    if (value.skills !== undefined) {
      setMySkills(value.skills);
    }
  }, [value]);
  console.log(mySkills);
  return (
    <>
      <Grid container direction="column">
        <Paper className={classes.root}>
          <div style={{ padding: 5 }}>
            <Typography className={classes.profileSkills}>
              Skills
              <Tooltip title="click  on the Text to begin editing">
                <EditOutlinedIcon
                  fontSize="small"
                  style={{ color: '#FF6500' }}
                />
              </Tooltip>
            </Typography>
            <Grid item>
              <Autocomplete
                multiple
                onChange={onChange}
                id="tags-standard"
                options={skills}
                size="small"
                freeSolo
                getOptionLabel={(option) => option}
                // defaultValue={[skills[1]]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="search for  Skills"
                    placeholder="Add Skills"
                    className={classes.skillsBox}
                  />
                )}
              />
            </Grid>

            {mySkills ? (
              <>
                <Grid container spacing={1}>
                  {mySkills.map((skill, index) => (
                    <Grid item key={index}>
                      <Chip label={skill} size="small" />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <CircularProgress />
            )}

            <Box className={classes.saveSkills}>
              {!hideButton ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  style={{
                    marginLeft: 10,
                    backgroundColor: '#FF6500',
                    color: 'white',
                  }}
                >
                  <SaveOutlinedIcon fontSize="small" /> {status}
                </Button>
              ) : (
                ''
              )}
            </Box>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
