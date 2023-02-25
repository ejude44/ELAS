import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { Tooltip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useApply } from "../../api/project/hooks";
import { useMyMembershipStatus } from "../../api/project/hooks";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { Chip } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Discussion from "../Cards/EditProject/Discussion";
import { List } from "@material-ui/core";
import { useContext } from "react";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import UserContext from "../../Store/UserContext";
import { imgProject } from "../../reuse/reuse";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(100),

      // height: theme.spacing(100),
    },
  },
  grid: {
    border: "1px solid grey",
    borderRadius: 5,

    margin: 3,
  },
  span: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontWeight: 400,
    fontSize: 21,
  },
  heading: {
    fontWeight: 700,
    fontSize: 18,
  },
  det: {
    fontWeight: 400,
    fontSize: 15,
  },
  detOptions: {
    fontWeight: 400,
    fontSize: 20,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Typography: {
    subtitle1: {
      fontweight: "bold",
    },
  },
}));

export default function ProjectDetail(props) {
  const { open, handleClose, project, id } = props;
  const userCtx = useContext(UserContext);
  const { status } = useMyMembershipStatus(id, userCtx.id);
  const [clicked, setClicked] = useState(false);
  const { apply } = useApply(id, userCtx.id);
  const classes = useStyles();
  const handleJoinProject = async () => {
    setClicked(true);
    await apply();
  };

  return (
    <Grid container direction="column">
      <Backdrop className={classes.backdrop} open={open}>
        <Paper
          className={classes.root}
          style={{ maxHeight: 570, overflow: "auto" }}
        >
          <List>
            <Grid item className={classes.span} onClick={handleClose}>
              <button type="button">
                <Tooltip title="close Dialog">
                  <CloseIcon />
                </Tooltip>
              </button>
            </Grid>
            <div style={{ padding: 1 }}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={5} className={classes.grid}>
                  <Grid item>
                    <img
                      src={imgProject}
                      height="100%"
                      width="100%"
                      alt="img"
                    />
                  </Grid>
                  <Divider></Divider>
                  <Typography className={classes.title} gutterBottom>
                    {project.title}
                  </Typography>
                  <Grid item className={classes.center}>
                    {!clicked ? (
                      <>
                        {status === "Send Application" ? (
                          <Button
                            size="small"
                            variant="contained"
                            disabled={
                              project.createdBy === userCtx.id ? true : false
                            }
                            style={{
                              color: "white",
                              backgroundColor: "#FF6500",
                            }}
                            onClick={handleJoinProject}
                          >
                            {status === "Send Application" ? status : ""}
                          </Button>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        style={{
                          color: "white",
                          backgroundColor: "#FF6500",
                        }}
                        disabled
                      >
                        <DoneOutlinedIcon size="small" />
                        Application Sent
                      </Button>
                    )}

                    {status === "pending" ? (
                      <Button
                        variant="contained"
                        size="small"
                        style={{
                          color: "black",
                          backgroundColor: "#EDEDED",
                        }}
                        disabled={status === "pending" ? true : false}
                      >
                        <WatchLaterIcon fontSize="small" /> {status}
                      </Button>
                    ) : (
                      ""
                    )}

                    {status === "accepted" ? (
                      <Button
                        variant="contained"
                        size="small"
                        style={{ color: "white", backgroundColor: "green" }}
                        disabled={status === "accepted" ? true : false}
                      >
                        <DoneOutlinedIcon size="small" /> {status}
                      </Button>
                    ) : (
                      ""
                    )}

                    {status === "rejected" ? (
                      <Button
                        size="small"
                        variant="contained"
                        style={{ color: "white", backgroundColor: "red" }}
                        disabled={status === "rejected" ? true : false}
                      >
                        <CloseOutlinedIcon fontSize="small" /> {status}
                      </Button>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>

                <Grid item xs={6} className={classes.grid}>
                  <Typography className={classes.heading} gutterBottom>
                    Details
                  </Typography>
                  <Typography className={classes.det} gutterBottom>
                    faculty
                  </Typography>
                  <Typography className={classes.detOptions} gutterBottom>
                    {project.faculty}
                  </Typography>
                  <Typography className={classes.det} gutterBottom>
                    Maximum Team size
                  </Typography>
                  <Typography className={classes.detOptions} gutterBottom>
                    {project.maxMembers}
                  </Typography>
                  <Typography className={classes.det} gutterBottom>
                    Degree
                  </Typography>
                  <Typography className={classes.detOptions} gutterBottom>
                    {project.degree}
                  </Typography>
                </Grid>

                <Grid item xs={5} className={classes.grid}>
                  <Typography className={classes.heading} gutterBottom>
                    Description
                  </Typography>
                  <section>{project.description}</section>
                  <Divider></Divider>
                  <Typography className={classes.heading} gutterBottom>
                    Skills Required
                  </Typography>

                  {project.skills ? (
                    <>
                      <Grid container spacing={1}>
                        {project.skills.map((skill, index) => (
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
                <Grid item xs={6} className={classes.grid}>
                  <Typography className={classes.heading} gutterBottom>
                    Discussion
                  </Typography>
                  <Discussion id={id} />
                </Grid>
              </Grid>
            </div>
          </List>
        </Paper>
      </Backdrop>
    </Grid>
  );
}
