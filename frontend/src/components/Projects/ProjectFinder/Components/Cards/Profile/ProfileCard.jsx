import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    'display': 'block',
    'flexWrap': 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      // width: theme.spacing(30),
      height: theme.spacing(35),
    },
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveProfile: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
    verticalAlign: 'text-bottom',
    marginTop: 5,
  },
  profileName: {
    fontWeight: 400,
    fontSize: 22,
    fontFamily: 'Roboto',
    font: 'Roboto',
    color: '#000000',
    lineHeight: 1.5,
  },
}));

export default function ProfileCard({ props }) {
  const classes = useStyles();
  const [hide, setHide] = useState(false);
  const [hideButton, setHideButton] = useState(true);

  const { value, setValue, handleSave, status, setStatus } = props;

  const onChange = (event) => {
    setValue({
      ...value,
      'degree': event.target.value,
    });

    setHideButton(false);
    setStatus('save');
  };

  const onChangePic = (event) => {
    setValue({
      ...value,
      'foto': event.target.value,
    });
    setStatus('save');
    setHideButton(false);
  };
  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === '') {
      setValue({ 'degree': event.target.value });
    } else {
      setValue({
        ...value,
        'degree': event.target.value,
      });
    }
  };

  const onBlurPic = (event) => {
    if (event.target.value.trim() === '') {
      return;
      // setValue({ 'foto': event.target.value });
    } else {
      setValue({
        ...value,
        'foto': event.target.value,
      });

      setHide(true);
      // setHideButton(true);
    }
  };

  return (
    <>
      <Grid container direction="column">
        <Paper className={classes.root}>
          <div style={{ padding: 5 }}>
            <Grid item>
              <Tooltip title="click  on the Text to begin editing">
                <EditOutlinedIcon fontSize="small" style={{color:'#FF6500'}}/>
              </Tooltip>
              {!hide && (
                <input
                  type="text"
                  aria-label="foto"
                  onBlur={onBlurPic}
                  onChange={onChangePic}
                  onKeyDown={onKeyDown}
                  value={value.foto}
                  label="Image url"
                  placeholder="enter image link"
                />
              )}
              <Grid item className={classes.center}>
                <Avatar
                  alt="profile pic"
                  src={value ? value.foto : ''}
                  className={classes.large}
                />
              </Grid>
            </Grid>
            <Grid item className={classes.center}>
              <Typography className={classes.profileName}>
                {value.name}
              </Typography>
            </Grid>
            <Grid item className={classes.center}>
              <input
                type="text"
                aria-label="degree"
                onBlur={onBlur}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={value.degree}
                label="Degree"
                placeholder="Enter a degree"
              />
            </Grid>
            <Box className={classes.saveProfile}>
              {' '}
              {!hideButton ? (
                <Button
                  color="primary"
                  variant="contained"
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
