import { Typography, Grid, Box, Button, Container } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CompleteProfile from '../../Components/Popup/CompleteProfile';
import { makeStyles } from '@material-ui/core';
import NewProject from '../../Components/Popup/NewProject';
import { useGetLoggedInUserProjects } from '../../api/user/hooks';
import { useGetLoggedInUserOtherProjects } from '../../api/user/hooks';
import MyProjects from '../../Components/Cards/MyProjects/MyProjects';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import ProjectDetail from '../../Components/Popup/ProjectDetail';
import UserContext from '../../Store/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 'inherit',
    // border: '1px solid black',
    // padding: 8,
    display: 'flex',
    // justifyContent: 'flex-end',
    // alignItems: 'right',
  },
  my: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
  },
  myProjects: {
    fontWeight: 700,
  },
  dashboard: {
    fontWeight: 400,
    fontSize: 20,
    fontFamily: 'Roboto',
    font: 'Roboto',
    color: '#000000',
    lineHeight: 2,
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
  },
  formControl: {
    margin: theme.spacing(0),
  },
}));

export default function Dashboard() {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const [notFound, setNotFound] = useState(false);
  const [openNewProject, setOpenNewProject] = useState(false);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState();
  const [loadedUserProjects, setLoadedUserProjects] = useState('');
  const [loadedUserOtherProjects, setLoadedUserOtherProjects] = useState('');
  const [isClicked, setIsClicked] = useState();
  const [loadedProjects, setLoadedProjects] = useState('');
  const { projects, getLoggedInUserProjects } = useGetLoggedInUserProjects(
    userCtx.id,
    authCtx.token
  );
  const { otherProjects } = useGetLoggedInUserOtherProjects(
    userCtx.id,
    authCtx.token
  );

  const history = useHistory();

  const classes = useStyles();

  const [state, setState] = useState({
    My: false,
    Other: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    if (projects !== undefined) {
      setLoadedUserProjects(projects);
    }

    if (otherProjects !== undefined && projects) {
      setLoadedUserOtherProjects(otherProjects);
      setLoadedProjects([...projects, ...otherProjects]);
    }

    if (loadedProjects !== undefined) {
      loadedProjects.length >= 1 ? setNotFound(false) : setNotFound(true);
    }

    userCtx.toComplete ? setOpen(true) : setOpen(false);
  }, [
    notFound,
    loadedUserProjects,
    projects,
    otherProjects,
    loadedUserOtherProjects,
  ]);

  useEffect(() => {
    if (state.My === true) {
      setLoadedProjects([...projects]);
    } else if (state.Other === true) {
      setLoadedProjects([...otherProjects]);
    } else if (otherProjects !== undefined && projects) {
      setLoadedProjects([...otherProjects, ...projects]);
    }

    // if (userCtx.toComplete === false) {
    //   setOpen(false);
    // } else if (userCtx.toComplete === true) {
    //   setOpen(true);
    // }
  }, [state]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewProject = () => {
    setOpenNewProject(true);
  };

  const toggleNewProject = () => {
    setOpenNewProject(false);
  };

  const handleYes = () => {
    setOpen(false);

    history.push('/profile');
  };

  const handleOpen = (id) => {
    setIsClicked(loadedProjects.find((x) => x.id === id));
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
    setIsClicked([]);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography className={classes.dashboard}>Dashboard</Typography>
        <Typography>Welcome:{userCtx.firstName} </Typography>
      </Grid>
      <Box className={classes.my}>
        <Typography className={classes.myProjects}>My Projects</Typography>
      </Box>

      <Box className={classes.box}>
        <Box className={classes.root}>
          <Grid item>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Filter Projects</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.My}
                      size="small"
                      onChange={handleChange}
                      name="My"
                      style={{ color: '#FF6500' }}
                    />
                  }
                  label="My projects"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={state.Other}
                      onChange={handleChange}
                      name="Other"
                      style={{ color: '#FF6500' }}
                    />
                  }
                  label="Other projects"
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              onClick={handleNewProject}
              variant="contained"
              style={{ color: 'white', backgroundColor: '#FF6500' }}
            >
              Create Project
            </Button>
          </Grid>
        </Box>
      </Box>

      <Grid item>
        {loadedProjects ? (
          <Container>
            <Grid container spacing={2}>
              {loadedProjects.map((filteredProject, index) => (
                <Grid item key={index} xs={12} md={4} sm={4}>
                  <MyProjects
                    filteredProject={filteredProject}
                    handleOpen={handleOpen}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
      </Grid>

      <Grid item>
        {open && (
          <CompleteProfile
            open={open}
            handleClose={handleClose}
            handleYes={handleYes}
          />
        )}

        {openNewProject && (
          <NewProject
            openNewProject={openNewProject}
            toggleNewProject={toggleNewProject}
            getLoggedInUserProjects={getLoggedInUserProjects}
            setOpenNewProject={setOpenNewProject}
          />
        )}
      </Grid>

      {notFound ? (
        <Typography>
          You do not have any Project yet, Create or search for projects.
        </Typography>
      ) : (
        ''
      )}

      {opens && (
        <ProjectDetail
          open={opens}
          handleClose={handleCloses}
          id={`${isClicked.id}`}
          project={isClicked}
        />
      )}
    </Grid>
  );
}
