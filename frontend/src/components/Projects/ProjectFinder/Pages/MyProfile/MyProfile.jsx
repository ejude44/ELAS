import { Typography, Grid } from '@material-ui/core';
import ProfileCard from '../../Components/Cards/Profile/ProfileCard';
import { makeStyles } from '@material-ui/core';
import AboutMe from '../../Components/Cards/Profile/AboutMe';
import Skills from '../../Components/Cards/Profile/Skills';
import { useState, useEffect } from 'react';
import { useEditProfile } from '../../api/user/hooks';
import { useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import UserContext from '../../Store/UserContext';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  align: {
    display: 'flex',
  },
  myProfile: {
    fontWeight: 400,
    fontSize: 20,
    fontFamily: 'Roboto',
    font: 'Roboto',
    color: '#000000',
    lineHeight: 3,
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MyProfile() {
  const authCtx = useContext(AuthContext);

  const userCtx = useContext(UserContext);

  const [status, setStatus] = useState('save');
  const [value, setValue] = useState({
    'name': '',
    'degree': '',
    'about': '',
    'skills': [],
    'foto': '',
  });

  useEffect(() => {
    setValue({
      'name': userCtx.firstName + ' ' + userCtx.lastName,
      'degree': userCtx.degree,
      'about': userCtx.description,
      'skills': userCtx.skills,
      'foto': userCtx.foto,
    });
  }, []);

  const { editProfile } = useEditProfile();

  const handleSave = async () => {
    await editProfile(userCtx.id, value, authCtx.token);
    await userCtx.getLoggedInUser();
    setStatus('saved');
    setOpen(true);
  };

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.myProfile} gutterBottom>
            My Profile
          </Typography>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} lg={3}>
            <ProfileCard
              props={{ value, handleSave, setValue, status, setStatus }}
            />
          </Grid>

          <Grid item xs={12} sm={8} lg={4}>
            <AboutMe
              props={{ setValue, value, handleSave, status, setStatus }}
            />
          </Grid>

          <Grid item xs={12} sm={8} lg={4}>
            <Skills
              props={{ setValue, value, handleSave, status, setStatus }}
            />
          </Grid>
        </Grid>

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Changes saved!
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}
