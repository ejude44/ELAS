import {
  Typography,
  Grid,
  Divider,
  TextField,
  Container,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useProjects } from "../../api/project/hooks";
import ProjectsCard from "../Cards/ProjectsCard/ProjectsCard";
import ProjectDetail from "../Popup/ProjectDetail";

const useStyles = makeStyles({
  projectsFound: {
    fontWeight: 400,
    fontSize: 15,
  },
});

export default function SearchProjectsComp() {
  const classes = useStyles();
  const { projects } = useProjects();
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [count, setCount] = useState();
  const [isClicked, setIsClicked] = useState();
  const [open, setOpen] = useState();

  // const [projectSearch, setProjectSearch] = useState("");

  // const handleProjectSearch = (event) => {
  //   setProjectSearch(event.target.value);
  // };

  useEffect(() => {
    setLoadedProjects(projects);
    setFilteredProjects(projects);
    if (filteredProjects !== undefined) {
      setCount(filteredProjects.length);
    }
  }, [projects, count, loadedProjects, setCount]);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    result = loadedProjects.filter((data) => {
      return data.title.concat(data.description).search(value) !== -1;
    });
    if (result.length <= 0) {
      setNotFound(true);
    } else if (result.length >= 1) {
      setNotFound(false);
    }
    setFilteredProjects(result);
    setCount(result.length);
  };

  const handleOpen = (id) => {
    setIsClicked(projects.find((x) => x.id === id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsClicked([]);
  };

  return (
    <Grid container direction="column">
      <TextField
        placeholder="Search by Keywords"
        // value={projectSearch}
        // onChange={handleProjectSearch}
        onChange={(event) => handleSearch(event)}
        variant="outlined"
        style={{ backgroundColor: "#fff", margin: 20 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "#909090" }} />
            </InputAdornment>
          ),
        }}
      />

      <Divider></Divider>

      <Grid item>
        {filteredProjects ? (
          <Container>
            <Typography className={classes.projectsFound} gutterBottom>
              {count} project(s) found
            </Typography>
            <Grid container spacing={3}>
              {filteredProjects.map((filteredProject) => (
                <Grid item key={filteredProject.id} xs={12} md={4} sm={4}>
                  <ProjectsCard
                    filteredProject={filteredProject}
                    handleOpen={handleOpen}
                  />
                </Grid>
              ))}
              {/* {projects.map((details, index) => {
                let nameToSearch = details.title
                  .concat(details.description)
                  .toLowerCase();
                const found = nameToSearch.includes(projectSearch);

                if (found) {
                  return (
                    <Grid item key={index}>
                      <ProjectsCard
                        filteredProject={details}
                        handleOpen={handleOpen}
                      />
                    </Grid>
                  );
                } else return "";
              })} */}
            </Grid>
          </Container>
        ) : (
          <CircularProgress />
        )}
      </Grid>
      {notFound ? "No results found" : ""}

      {open && (
        <ProjectDetail
          open={open}
          handleClose={handleClose}
          id={`${isClicked.id}`}
          project={isClicked}
        />
      )}
    </Grid>
  );
}
