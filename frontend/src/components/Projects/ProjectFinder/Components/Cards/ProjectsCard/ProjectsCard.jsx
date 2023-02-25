import * as React from "react";
import { Card } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useMyMembershipStatus } from "../../../api/project/hooks";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useContext } from "react";
import UserContext from "../../../Store/UserContext";
import customClasses from "./../../../Css/Card.module.css";
import { imgProject } from "../../../reuse/reuse";

const useStyles = makeStyles({
  card: {
    borderRadius: 15,
    backgroundColor: "#FDBA74",
  },
  box: {
    display: "flex",
  },
  viewProject: {
    marginLeft: 15,
    marginBottom: 15,
    fontWeight: 600,
    fontSize: 13,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "left",
  },
  title: {
    fontWeight: 400,
    fontSize: 17,
  },
  isApplications: {
    marginBottom: 15,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
    marginLeft: 100,
  },
  status: {
    marginLeft: 3,
  },
});

export default function ProjectsCard({
  filteredProject,
  handleOpen,
  isApplications,
}) {
  const classes = useStyles();
  const userCtx = useContext(UserContext);
  const { status } = useMyMembershipStatus(filteredProject.id, userCtx.id);

  return (
    <>
      <Card style={{ borderRadius: 5 }} className={customClasses.Card}>
        <CardMedia
          style={{ padding: 5 }}
          component="img"
          // height="90"
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
        </CardContent>

        <CardActionArea onClick={() => handleOpen(filteredProject.id)}>
          <Box className={classes.box}>
            <Typography
              color="primary"
              variant="body2"
              className={classes.viewProject}
            >
              VIEW PROJECT
            </Typography>
            {isApplications ? (
              <div className={classes.isApplications}>
                {status === "accepted" ? (
                  <DoneOutlinedIcon
                    fontSize="small"
                    style={{ color: "green" }}
                  />
                ) : (
                  ""
                )}
                {status === "rejected" ? (
                  <CloseOutlinedIcon
                    fontSize="small"
                    style={{ color: "red" }}
                  />
                ) : (
                  ""
                )}
                {status === "pending" ? (
                  <WatchLaterIcon fontSize="small" />
                ) : (
                  " "
                )}
                <Typography className={classes.status}>{status}</Typography>
              </div>
            ) : (
              ""
            )}
          </Box>
        </CardActionArea>
      </Card>
    </>
  );
}
