import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { skills, langauges } from "../../../reuse/reuse";
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
      width: theme.spacing(50),
      //   height: theme.spacing(10),
    },
  },
}));

export default function EditProfileSkills(props) {
  const { handleSave, open, handleClose, onChange, onLanguageSkillsChange } =
    props;

  const classes = useStyles();

  return (
    <Grid container direction="column">
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <Paper className={classes.root}>
            <div style={{ padding: 10 }}>
              <Typography variant="h5" gutterBottom>
                Edit Profile Skills
              </Typography>

              <Grid item>
                <Autocomplete
                  multiple
                  onChange={onChange}
                  // onBlur={onBlur}
                  id="tags-standard"
                  options={skills}
                  size="small"
                  freeSolo
                  getOptionLabel={(option) => option}
                  defaultValue={[skills[1]]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="search for Skills"
                      placeholder="Add Skills"
                      className={classes.skillsBox}
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <Autocomplete
                  multiple
                  onChange={onLanguageSkillsChange}
                  // onBlur={onBlur}
                  id="tags-standard"
                  options={langauges}
                  size="small"
                  freeSolo
                  getOptionLabel={(option) => option}
                  defaultValue={[langauges[2]]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="search for Langauges"
                      placeholder="Add language Skills"
                      className={classes.skillsBox}
                    />
                  )}
                />
              </Grid>
            </div>
            <Box textAlign="right" padding={2}>
              <Button variant="outlined" size="small" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleSave}
                style={{
                  marginLeft: 10,
                  backgroundColor: "#FF6500",
                  color: "white",
                }}
              >
                <SaveOutlinedIcon fontSize="small" /> Save
              </Button>
            </Box>
          </Paper>
        </Backdrop>
      </div>
    </Grid>
  );
}
