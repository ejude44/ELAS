import { Typography, Grid, Box, Container } from '@material-ui/core';
import { useUserMemberships } from '../../api/user/hooks';
import ProjectsCard from '../Cards/ProjectsCard/ProjectsCard';
import { CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ProjectDetail from '../Popup/ProjectDetail';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import UserContext from '../../Store/UserContext';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Accordion } from '@material-ui/core/';
import { AccordionSummary } from '@material-ui/core/';
import { AccordionDetails } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
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
  filter: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
    marginTop: 10,
  },
  box: {
    display: 'flex',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ApplicationsS() {
  const classes = useStyles();
  const userCtx = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState();
  const [open, setOpen] = useState();
  const [isApplications, setIsApplications] = useState(false);
  const [loadedProjects, setLoadedProjects] = useState([]);

  const { projects } = useUserMemberships(userCtx.id);
  const [filterProj, setFilterProj] = useState([]);
  console.log(projects);

  useEffect(() => {
    setIsApplications(true);
    if (projects !== undefined) {
      setLoadedProjects(projects);
      setCount(projects.length);
    }
  }, [count, projects, isApplications]);

  const handleOpen = (id) => {
    setIsClicked(projects.find((x) => x.id === id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsClicked([]);
  };

  const [state, setState] = useState({
    Pending: false,
    Accepted: false,
    Rejected: false,
  });

  const statuses = [
    { status: 'accepted' },
    { status: 'rejected' },
    { status: 'pending' },
  ];
  const handleChange = (event) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked) {
      setLoadedProjects([...loadedProjects, event.target.value]);
    } else {
      setLoadedProjects(
        loadedProjects.filter((id) => id !== event.target.value)
      );
    }
  };

  useEffect(() => {
    if (loadedProjects.length === 0) {
      setFilterProj(
        loadedProjects.filter((project) =>
          projects.some((stat) => [project.status].flat().includes(stat))
        )
      );
    } else if (projects !== undefined) {
      setFilterProj(projects);
      // setFilterProj(
      //   loadedProjects.filter((project) =>
      //     projects.some((stat) => [project.status].flat().includes(stat))
      //   )
      // );
    }
  }, [loadedProjects]);

  return (
    <>
      <Grid container direction="column">
        <Grid container>
          <Grid item xs={9}>
            <Grid item style={{ marginTop: 10 }}>
              <Typography className={classes.added}>
                Accepted projects are automatically added to your
                <Link to="/project-finder"> Dashboard</Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Box className={classes.filter}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Filter by Status
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <Box className={classes.filter}> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    {/* <FormLabel component="legend">Filter Projects</FormLabel> */}
                    <FormGroup>
                      {statuses.map((status) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              // checked={state.Pending}
                              size="small"
                              onChange={handleChange}
                              style={{ color: '#FF6500' }}
                            />
                          }
                          // name="Pending"
                          label={status.status}
                          value={status.status}
                        />
                      ))}
                      {/* <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.Pending}
                            size="small"
                            onChange={handleChange}
                            name="Pending"
                            style={{ color: '#FF6500' }}
                          />
                        }
                        label="Pending"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={state.Accepted}
                            onChange={handleChange}
                            name="Accepted"
                            style={{ color: '#FF6500' }}
                          />
                        }
                        label="Accepted"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={state.Rejected}
                            onChange={handleChange}
                            name="Rejected"
                            style={{ color: '#FF6500' }}
                          />
                        }
                        label="Rejected"
                      /> */}
                    </FormGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>

        {loadedProjects ? (
          <Container style={{ marginTop: 30 }}>
            <Grid item>
              <Typography className={classes.projectsFound}>
                {' '}
                {count} project(s) found
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              {filterProj.map((filteredProject, index) => (
                <Grid item key={index} xs={12} md={4} sm={4}>
                  <ProjectsCard
                    filteredProject={filteredProject}
                    loadedProjects={loadedProjects}
                    handleOpen={handleOpen}
                    isApplications={isApplications}
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
