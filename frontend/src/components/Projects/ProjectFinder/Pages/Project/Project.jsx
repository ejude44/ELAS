import {
  Typography,
  Grid,
  Paper,
  Tab,
  Tabs,
  Box,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
} from 'react-router-dom';

import ProjectDetails from '../../Components/ProjectDetail/ProjectDetails';
import ProjectApplications from '../../Components/ProjectDetail/ProjectApplications';
import { useProjectMembers } from '../../api/user/hooks';
import { useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import { useMyMembershipStatus, useProject } from '../../api/project/hooks';
import { useEditProject } from '../../api/project/hooks';
import ConfirmDelete from '../../Components/Popup/EditProject/ConfirmDelete';
import { useHistory } from 'react-router-dom';
import { useDeleteProject } from '../../api/project/hooks';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  tabs: {
    marginRight: 30,
  },
  nav: {
    listStyle: 'None',
    display: 'flex',
  },
  li: {
    padding: 5,
    textDecoration: 'none',
    fontSize: 15,
    fontWeight: 400,
  },
  deleteProject: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'right',
  },
  active: {
    borderBottom: '2px solid #FF6500',
    // borderRadius: '6px',
    color: '#FF6500',
  },
  sup: {
    verticalAlign: 'super',
    fontSize: 'medium',
    color: 'white',
    backgroundColor: '#FF6500',
    borderRadius: 400 / 2,
    marginLeft: -20,
    padding: 4,
  },
});

export default function SearchProjects() {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  const [values, setValues] = useState(0);
  const { id } = useParams();
  const { members } = useProjectMembers(id);

  const history = useHistory();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { deleteProject } = useDeleteProject();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.slice('/');

  const authCtx = useContext(AuthContext);

  const { project, getProj } = useProject(id);
  const [loadedProject, setLoadedProject] = useState(project);
  const [value, setValue] = useState({
    'title': '',
    'faculty': '',
    'degree': '',
    'maxMembers': '',
    'description': '',
    'skills': '',
  });
  // const [saveIsClicked, setSaveIsClicked] = useState(false);
  const [open, setOpen] = useState({
    'title': false,
    'details': false,
    'descSkills': false,
  });

  const { editProject } = useEditProject();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnEditTitleClick = () => {
    setOpen({ 'title': true });
  };

  const handleOnEditDetailsClick = () => {
    setOpen({ 'details': true });
  };

  const handleOnEditDescSkillsClick = () => {
    setOpen({ 'descSkills': true });
  };
  const handleSave = () => {
    editProject(id, value, authCtx.token);
    setOpen(false);
    getProj();
  };

  const handleChange = (event, newValues) => {
    setValues(newValues);
  };

  const handleDeleteProject = () => {
    setConfirmDelete(true);
  };

  const handleCancel = () => {
    setConfirmDelete(false);
  };

  const handleYes = async () => {
    await deleteProject(id);
    history.push('/project-finder');
    setConfirmDelete(false);
  };

  useEffect(() => {
    if (project !== undefined) {
      project.map((det) => {
        setValue({
          ...value,
          'title': det.title,
          'description': det.description,
          'maxMembers': det.max_members,
          'faculty': det.faculty,
          'skills': det.skills,
          'degree': det.degree,
        });
      });
      setLoadedProject(project);
    }
  }, [loadedProject, project, open]);
  return (
    <>
      {confirmDelete && (
        <ConfirmDelete
          open={confirmDelete}
          handleClose={handleCancel}
          handleYes={handleYes}
        />
      )}
      <Grid container direction="column">
        <Grid item>
          <ul className={classes.nav}>
            <Link to="/project-finder" className={classes.li}>
              Dashboard
            </Link>
            <li className={classes.li}>{`>`}</li>
            <li className={classes.li}>
              <p>{value.title}</p>
            </li>
          </ul>
        </Grid>

        <Box className={classes.deleteProject}>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              onClick={handleDeleteProject}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Delete Project
            </Button>
          </Grid>
        </Box>

        {/* <Grid item> */}
        <Paper className={classes.root}>
          <Tabs
            value={values}
            onChange={handleChange}
            indicatorColor="white"
            centered
          >
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={`${url}/details`}
              className={`${
                splitLocation === `/projects/${id}/details`
                  ? classes.active
                  : ''
              }`}
            >
              <Tab label="Project Details" />
            </Link>

            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={`${url}/applications`}
              className={`${
                splitLocation === `/projects/${id}/applications`
                  ? classes.active
                  : ''
              }`}
            >
              <Tab label="applications" />
              <span className={classes.sup}>
                {members ? members.length : ''}
              </span>
            </Link>
          </Tabs>
        </Paper>
        <Switch>
          <Route path={`${path}/details`}>
            <ProjectDetails
              id={id}
              value={value}
              handleClose={handleClose}
              open={open}
              handleSave={handleSave}
              setValue={setValue}
              handleOnEditTitleClick={handleOnEditTitleClick}
              handleOnEditDetailsClick={handleOnEditDetailsClick}
              handleOnEditDescSkillsClick={handleOnEditDescSkillsClick}
            />
          </Route>
          <Route path={`${path}/applications`}>
            <ProjectApplications />
          </Route>
        </Switch>
        {/* </Grid> */}
      </Grid>
    </>
  );
}
