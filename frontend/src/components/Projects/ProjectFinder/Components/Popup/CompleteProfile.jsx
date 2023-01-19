import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

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
      // width: theme.spacing(30),
      height: theme.spacing(10),
    },
  },
}));

export default function CompleteProfile(props) {
  const { handleYes, open, handleClose } = props;
  

  const classes = useStyles();

  //   const [open, setOpen] = React.useState(true);

  return (
    <Grid container direction="column">
      <div>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <Paper className={classes.root}>
            <div style={{ padding: 20 }}>
              <Typography
             variant="h5"
              >
                Do you want to set up your Profile page?
              </Typography>
              <Typography variant="subtitle2">
                Setting up your Profile will help you get personalised
                recommendation of Projects
              </Typography>
            </div>
            <Box textAlign="right" padding={2}>
              <Button variant="outlined" onClick={handleClose}>
                later
              </Button>
              <Button
                variant="contained"
                onClick={handleYes}
                style={{
                  marginLeft: 10,
                  backgroundColor: "#FF6500",
                  color: "white",
                }}
              >
                Yes
              </Button>
            </Box>
          </Paper>
        </Backdrop>
      </div>
    </Grid>
  );
}
