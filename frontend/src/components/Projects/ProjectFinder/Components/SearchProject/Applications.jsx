import { Typography, Grid, Box, Container } from '@material-ui/core';
import { useGetLoggedInUser } from '../../api/user/hooks';
import { useUserMemberships } from '../../api/user/hooks';
import ProjectsCard from '../Cards/ProjectsCard/ProjectsCard';
import { CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ProjectDetail from '../Popup/ProjectDetail';
import { useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  projectsFound: {
    font: 'Roboto',
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 3,
  },
  added: {
    font: 'Roboto',
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 15,
  },
});

export default function ApplicationsS() {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const [loggedInUserId, setLoggedInUserId] = useState();
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState();
  const [open, setOpen] = useState();
  const [isApplications, setIsApplications] = useState(false);

  const { user } = useGetLoggedInUser(authCtx.token);

  useEffect(() => {
    setIsApplications(true);
    if (user !== undefined) {
      user.map((details) => {
        setLoggedInUserId(details.id);
        return details.id;
      });
    } else {
      return;
    }
  }, [user, loggedInUserId, count, isApplications]);

  const { projects } = useUserMemberships(loggedInUserId);
  useEffect(() => {
    if (projects !== undefined) {
      setCount(projects.length);
    }
  }, [count, projects]);

  const handleOpen = (id) => {
    setIsClicked(projects.find((x) => x.id === id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsClicked([]);
  };

  return (
    <>
      <Grid container direction="column">
        {projects ? (
          <Container style={{ marginTop: 30 }}>
            <Grid item style={{ marginBottom: 10 }}>
              <Typography className={classes.added}>
                Accepted projects are automatically added to your 
                <Link to="/project-finder"> Dashboard</Link>
              </Typography>
            </Grid>

            <Grid item>
              <Typography className={classes.projectsFound}>
                {' '}
                {count} project(s) found
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              {projects.map((filteredProject, index) => (
                <Grid item key={index} xs={12} md={4} sm={4}>
                  <ProjectsCard
                    filteredProject={filteredProject}
                    handleOpen={handleOpen}
                    isApplications={isApplications}
                    loggedInUserId={loggedInUserId}
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

        {open && (
          <ProjectDetail
            open={open}
            handleClose={handleClose}
            id={`${isClicked.id}`}
            project={isClicked}
          />
        )}
      </Grid>
    </>
  );
}
