import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";
import ProjectDetails from "../../Components/ProjectDetail/ProjectDetails";
import ProjectApplications from "../../Components/ProjectDetail/ProjectApplications";
import { useContext } from "react";
import AuthContext from "../../Store/AuthContext";
import { useMyMembershipStatus, useProject } from "../../api/project/hooks";
import { useEditProject } from "../../api/project/hooks";
import ConfirmDelete from "../../Components/Popup/EditProject/ConfirmDelete";
import { useHistory } from "react-router-dom";
import { useDeleteProject } from "../../api/project/hooks";
import { useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  tabs: {
    marginRight: 30,
  },
  nav: {
    listStyle: "None",
    display: "flex",
  },
  li: {
    padding: 5,
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 400,
  },
  deleteProject: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "right",
  },
  active: {
    borderBottom: "2px solid #FF6500",
    color: "#FF6500",
  },
  sup: {
    verticalAlign: "super",
    fontSize: 15,
    color: "white",
    backgroundColor: "#FF6500",
    borderRadius: 400 / 2,
    padding: 4,
  },
  navItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});

export default function SearchProjects() {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  const { id } = useParams();
  const [appMem, setAppMem] = useState();
  const { MEM } = useMyMembershipStatus(id, null);
  const history = useHistory();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { deleteProject } = useDeleteProject();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.slice("/");
  const [status, setStatus] = useState();
  const authCtx = useContext(AuthContext);
  const { project, getProj } = useProject(id);
  const [loadedProject, setLoadedProject] = useState(project);
  const [value, setValue] = useState({
    title: "",
    faculty: "",
    degree: "",
    maxMembers: "",
    description: "",
    skills: "",
  });

  const [open, setOpen] = useState({
    title: false,
    details: false,
    descSkills: false,
  });

  const [opens, setOpens] = useState(false);

  const handleCloses = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpens(false);
  };

  const { editProject } = useEditProject();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnEditTitleClick = () => {
    setOpen({ title: true });
  };
  const handleOnEditDetailsClick = () => {
    setOpen({ details: true });
  };
  const handleOnEditDescSkillsClick = () => {
    setOpen({ descSkills: true });
  };

  const handleSave = async () => {
    const save = await editProject(id, value, authCtx.token);
    if (save.success) {
      setOpen(false);
      setOpens(true);
      setStatus(save.data.sucess);
    } else {
      setOpen(false);
      setOpens(true);
      setStatus(save.status);
    }
    await getProj();
  };

  const handleDeleteProject = () => {
    setConfirmDelete(true);
  };

  const handleCancel = () => {
    setConfirmDelete(false);
  };

  const handleYes = async () => {
    const yes = await deleteProject(id);
    if (yes.success) {
      history.push("/project-finder");
      setConfirmDelete(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (project !== undefined) {
      project.map((det) => {
        setValue({
          ...value,
          title: det.title,
          description: det.description,
          maxMembers: det.max_members,
          faculty: det.faculty,
          skills: det.skills,
          degree: det.degree,
        });
        return "";
      });
      setLoadedProject(project);
    }
    if (MEM !== undefined) {
      const appmem = MEM.filter(
        // eslint-disable-next-line eqeqeq
        (mem) => mem.status === "pending" && mem.project_id == id
      );

      setAppMem(appmem);
    }
  }, [loadedProject, project, open, MEM]);
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
        <Grid container>
          <Grid item xs>
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

          <Grid item>
            <Button
              size="small"
              variant="contained"
              onClick={handleDeleteProject}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete Project
            </Button>
          </Grid>
        </Grid>

        <Paper className={classes.root}>
          <Grid item className={classes.navItems}>
            <Link
              style={{ textDecoration: "none", color: "black", margin: 20 }}
              to={`${url}/details`}
              className={`${
                splitLocation === `/projects/${id}/details`
                  ? classes.active
                  : ""
              }`}
            >
              <Typography>
                <b>Project Details</b>
              </Typography>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "black", margin: 20 }}
              to={`${url}/applications`}
              className={`${
                splitLocation === `/projects/${id}/applications`
                  ? classes.active
                  : ""
              }`}
            >
              <Typography>
                <b> Applications</b>
                <span className={classes.sup}>
                  {appMem ? appMem.length : ""}
                </span>
              </Typography>
            </Link>
          </Grid>
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
        <Snackbar open={opens} autoHideDuration={3000} onClose={handleCloses}>
          <Alert onClose={handleCloses} severity="success">
            {status}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}
