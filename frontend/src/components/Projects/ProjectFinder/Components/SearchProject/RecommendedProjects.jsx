import { Typography, Grid } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { useContext, useState } from "react";
import UserContext from "../../Store/UserContext";
import { useProjects } from "../../api/project/hooks";
import { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { Container } from "@material-ui/core";
import ProjectsCard from "../Cards/ProjectsCard/ProjectsCard";
import ProjectDetail from "../Popup/ProjectDetail";

export default function RecommendedProjects() {
  const userCtx = useContext(UserContext);
  const { projects } = useProjects();
  const [skills, setSkills] = useState(userCtx.skills);
  const [filteredProjects, setFilteredProjects] = useState();
  const [isClicked, setIsClicked] = useState();
  const [open, setOpen] = useState();

  useEffect(() => {
    setSkills(userCtx.skills);
    if (projects !== undefined && skills !== null) {
      const filteredData = projects.filter((project) => {
        return skills.some((skill) => project.skills.includes(skill));
      });
      setFilteredProjects(filteredData);
    }
  }, [projects, skills]);

  const handleOpen = (id) => {
    setIsClicked(filteredProjects.find((x) => x.id === id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsClicked([]);
  };

  return (
    <>
      <Grid container direction="column">
        <Grid container style={{ marginTop: 10 }}>
          <Grid item xs={4}>
            <Grid item>
              <Typography gutterBottom>
                Recommendations are based on your skills:
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {skills ? (
              <>
                <Grid container spacing={1}>
                  {skills.map((skill, index) => (
                    <Grid item key={index}>
                      <Chip label={skill} size="small" />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <CircularProgress />
            )}
          </Grid>

          {filteredProjects ? (
            <Container style={{ marginTop: 30 }}>
              <Grid container spacing={3}>
                {filteredProjects.map((filteredProject, index) => (
                  <Grid item key={index} xs={12} md={4} sm={4}>
                    <ProjectsCard
                      filteredProject={filteredProject}
                      // loadedProjects={loadedProjects}
                      handleOpen={handleOpen}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          ) : (
            <CircularProgress />
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
      </Grid>
    </>
  );
}
