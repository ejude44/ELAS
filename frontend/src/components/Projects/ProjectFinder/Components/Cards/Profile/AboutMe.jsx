import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { useState } from "react";
import { Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Tooltip } from "@material-ui/core";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import customClasses from "./../../../Css/Input.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      // width: theme.spacing(30),
      height: theme.spacing(35),
    },
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  saveAbout: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
    verticalAlign: "text-bottom",
    marginTop: 15,
  },
  profileDescription: {
    fontWeight: 700,
    fontSize: 22,
  },
}));

export default function AboutMe({ props }) {
  const classes = useStyles();
  const { setValue, value, handleSave, status, setStatus, desc } = props;
  const [hideButton, setHideButton] = useState(true);

  const onChange = (event) => {
    setValue({ ...value, about: event.target.value });
    setHideButton(false);
    setStatus("save");
  };

  const handleCancel = () => {
    setValue({ ...value, about: desc });
    setHideButton(true);
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === "") {
      return;
    } else {
      setValue({ ...value, about: event.target.value });
    }
  };

  return (
    <>
      <Grid container direction="column">
        <Paper className={classes.root}>
          <div style={{ padding: 5 }}>
            <Grid item>
              <Typography className={classes.profileDescription}>
                About me
                <Tooltip title="Click on text to begin editing">
                  <EditOutlinedIcon
                    fontSize="small"
                    style={{ color: "#FF6500" }}
                  />
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item className={classes.center}>
              <textarea
                style={{ width: "100%" }}
                className={customClasses.textarea}
                rows={11}
                aria-label="Field name"
                value={value.about}
                onBlur={onBlur}
                onChange={onChange}
                placeholder="enter a short story of yourself"
              />
            </Grid>

            <Box className={classes.saveAbout}>
              {!hideButton ? (
                <>
                  <Button
                    size="small"
                    onClick={handleCancel}
                    variant="outlined"
                    style={{
                      marginRight: 10,
                    }}
                  >
                    {status === "saved" ? "Hide" : "Cancel"}
                  </Button>
                  <Button
                    size="small"
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "#FF6500",
                      color: "white",
                    }}
                  >
                    <SaveOutlinedIcon fontSize="small" /> {status}
                  </Button>
                </>
              ) : (
                ""
              )}
            </Box>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
