import * as React from "react";

import { Card } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";

import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { imgProject } from "../../../reuse/reuse";
import { makeStyles } from "@material-ui/styles";
import { useProjectMembers } from "../../../api/user/hooks";
import AvatarMyProject from "../../AvatarMyProject/AvatarMyProject";
import { useProjectTeamMembers } from "../../../api/project/hooks";
import { CircularProgress } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { useMyMembershipStatus } from "../../../api/project/hooks";
import { useEffect, useState } from "react";
import customClasses from "./../../../Css/Card.module.css";

const useStyles = makeStyles({
  card: {
    borderRadius: 15,
    backgroundColor: "#FDBA74",
  },
  box: {
    display: "flex",
  },
  editView: {
    margin: 10,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
  },
  textEditView: {
    fontWeight: 600,
    fontSize: 13,
  },
  title: {
    fontWeight: 400,
    fontSize: 17,
    lineHeight: 2,
  },
  applications: {
    fontWeight: 50,
    fontSize: 12,
    lineHeight: 2,
  },
  members: {
    margin: 10,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "left",
  },
});

export default function MyProjects({ filteredProject, handleOpen }) {
  const { members } = useProjectMembers(filteredProject.id);
  const { teamMembers } = useProjectTeamMembers(filteredProject.id);
  const { MEM } = useMyMembershipStatus(filteredProject.id, null);
  const [appMem, setAppMem] = useState();

  useEffect(() => {
    if (MEM !== undefined) {
      const mems = MEM.filter(
        (mem) =>
          mem.status === "pending" && mem.project_id == filteredProject.id
      );
      setAppMem(mems);
    }
  }, [MEM]);

  const classes = useStyles();

  return (
    <>
      <Card
        style={{ borderRadius: 5, width: 310, height: 280 }}
        className={customClasses.Card}
      >
        <CardMedia
          component="img"
          height="80"
          alt="projects"
          src={imgProject}
        />
        <CardHeader />

        <CardContent>
          <Typography className={classes.title}>
            {filteredProject.title.length <= 32
              ? filteredProject.title
              : filteredProject.title.substr(0, 31) + "..."}
          </Typography>
          <Grid item>
            <Typography className={classes.applications}>
              # New Application(s){" "}
              {appMem ? appMem.length : "no applications yet"}
            </Typography>
          </Grid>
        </CardContent>
        <Box className={classes.box}>
          <Box className={classes.members}>
            <Grid item>
              <Typography>Members</Typography>

              {teamMembers ? (
                <AvatarGroup max={3}>
                  {teamMembers.map((filteredMembers, index) => (
                    <AvatarMyProject
                      filteredMembers={filteredMembers}
                      key={index}
                    />
                  ))}
                </AvatarGroup>
              ) : (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          </Box>

          {filteredProject.user_id ? (
            <CardActionArea
              component={Link}
              to={/projects/ + filteredProject.id + "/details"}
            >
              <Box className={classes.editView}>
                <Typography color="primary" className={classes.textEditView}>
                  EDIT PROJECT
                </Typography>
              </Box>
            </CardActionArea>
          ) : (
            <CardActionArea onClick={() => handleOpen(filteredProject.id)}>
              <Box className={classes.editView}>
                <Typography color="primary" className={classes.textEditView}>
                  VIEW PROJECT
                </Typography>
              </Box>
            </CardActionArea>
          )}
        </Box>
      </Card>
    </>
  );
}
