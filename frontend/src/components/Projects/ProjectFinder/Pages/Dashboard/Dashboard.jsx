import { Typography, Grid, Box, Button, Container } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CompleteProfile from "../../Components/Popup/CompleteProfile";
import { makeStyles } from "@material-ui/core";
import NewProject from "../../Components/Popup/NewProject";
import { useGetLoggedInUserProjects } from "../../api/user/hooks";
import { useGetLoggedInUserOtherProjects } from "../../api/user/hooks";
import MyProjects from "../../Components/Cards/MyProjects/MyProjects";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useContext } from "react";
import AuthContext from "../../Store/AuthContext";
import ProjectDetail from "../../Components/Popup/ProjectDetail";
import UserContext from "../../Store/UserContext";

const useStyles = makeStyles((theme) => ({
  myProjects: {
    fontWeight: 700,
    lineHeight: 3,
  },
  dashboard: {
    fontWeight: 400,
    fontSize: 20,

    lineHeight: 2,
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
  const [loadedUserProjects, setLoadedUserProjects] = useState("");
  const [loadedUserOtherProjects, setLoadedUserOtherProjects] = useState("");
  const [isClicked, setIsClicked] = useState();
  const [loadedProjects, setLoadedProjects] = useState("");
  const { projects, getLoggedInUserProjects } = useGetLoggedInUserProjects(
    userCtx.id,
    authCtx.token
  );
  const { otherProjects } = useGetLoggedInUserOtherProjects(
    userCtx.id,
    authCtx.token
  );
  const [filteredPro, setFilteredPro] = useState([]);

  const history = useHistory();

  const classes = useStyles();

  const [state, setState] = useState({
    My: true,
    Other: true,
  });

  const handleChange = (status) => {
    setState({ ...state, [status]: !state[status] });
  };

  useEffect(() => {
    if (projects !== undefined && otherProjects !== undefined) {
      setLoadedUserProjects(projects);
      setLoadedUserOtherProjects(otherProjects);

      const data = projects.concat(otherProjects).filter((item) => {
        if (state.My && item.user_id) {
          return true;
        }
        if (state.Other && !item.user_id) {
          return true;
        }
        return false;
      });

      setFilteredPro(data);
    }

    filteredPro.length >= 1 ? setNotFound(false) : setNotFound(true);

    userCtx.toComplete ? setOpen(true) : setOpen(false);
  }, [
    notFound,
    loadedUserProjects,
    projects,
    otherProjects,
    state,
    loadedUserOtherProjects,
    filteredPro.length,
    userCtx.toComplete,
  ]);

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

    history.push("/profile");
  };

  const handleOpen = (id) => {
    setIsClicked(filteredPro.find((x) => x.id === id));
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
    setIsClicked([]);
  };

  return (
    <Grid container direction="column">
      <Grid container>
        <Grid item xs={8}>
          <Typography className={classes.dashboard} gutterBottom>
            Dashboard
          </Typography>
          <Typography gutterBottom>Welcome:{userCtx.firstName} </Typography>
          <Typography className={classes.myProjects} gutterBottom>
            My Projects
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Filter Projects</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.My}
                    size="small"
                    onChange={() => handleChange("My")}
                    name="My"
                    style={{ color: "#FF6500" }}
                  />
                }
                label="My projects"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={state.Other}
                    onChange={() => handleChange("Other")}
                    name="Other"
                    style={{ color: "#FF6500" }}
                  />
                }
                label="Other projects"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={handleNewProject}
            variant="contained"
            style={{ color: "white", backgroundColor: "#FF6500" }}
            size="small"
          >
            Create Project
          </Button>
        </Grid>
      </Grid>

      <Grid item>
        {filteredPro ? (
          <Container>
            <Grid container spacing={2}>
              {filteredPro.map((filteredProject, index) => (
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
          <CircularProgress />
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
        ""
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
