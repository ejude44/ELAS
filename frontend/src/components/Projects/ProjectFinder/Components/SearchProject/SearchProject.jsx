import {
  Typography,
  Grid,
  Divider,
  Box,
  TextField,
  Container,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useProjects } from '../../api/project/hooks';
import ProjectsCard from '../Cards/ProjectsCard/ProjectsCard';
import ProjectDetail from '../Popup/ProjectDetail';

const useStyles = makeStyles({
  projectsFound: {
    font: 'Roboto',
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 3,
  },
});

export default function SearchProjectsComp() {
  const classes = useStyles();
  const { projects } = useProjects();
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(loadedProjects);
  const [notFound, setNotFound] = useState(false);
  const [count, setCount] = useState();

  const [isClicked, setIsClicked] = useState();
  const [open, setOpen] = useState();

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
      return data.description.concat(data.title).search(value) !== -1;
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
    setIsClicked(filteredProjects.find((x) => x.id === id));
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
        onChange={(event) => handleSearch(event)}
        variant="outlined"
        style={{ backgroundColor: '#fff', margin: 20 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: '#909090' }} />
            </InputAdornment>
          ),
        }}
      />

      <Divider></Divider>

      <Grid item>
        {filteredProjects ? (
          <Container>
            <Typography className={classes.projectsFound}>
              {count} project(s) found
            </Typography>
            <Grid container spacing={2}>
              {filteredProjects.map((filteredProject) => (
                <Grid item key={filteredProject.id} xs={12} md={4} sm={4}>
                  <ProjectsCard
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
      {notFound ? 'No results found' : ''}

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
