import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import {  Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import TitleAndDetails from "../NewProjectForm/TitleAndDetail";
import DescriptionAndSkills from "../NewProjectForm/DescriptionAndSkills";
import { Tooltip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useCreateProject } from "../../api/project/hooks";
import { useContext } from "react";
import AuthContext from "../../Store/AuthContext";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: "#FF6500",
    color: "white",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  rootPaper: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: "inherit",
    },
  },
  span: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
  },
}));

export default function NewProject(props) {
  const authCtx = useContext(AuthContext);

  const {
    openNewProject,
    toggleNewProject,
    getLoggedInUserProjects,
    setOpenNewProject,
  } = props;

  const { createProject } = useCreateProject();

  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [value, setValue] = useState({
    title: "",
    faculty: "",
    degree: "",
    maxMembers: "",
    description: "",
    skills: "",
    titleError: {
      error: false,
      message: "",
    },
    descriptionError: {
      error: false,
      message: "",
    },
    facultyError: {
      error: false,
      message: "",
    },
    degreeError: {
      error: false,
      message: "",
    },
    skillsError: {
      error: false,
      message: "",
    },
    maxMembersError: {
      error: false,
      message: "",
    },
  });

  const validate = () => {
    if (!value.title) {
      setValue({
        ...value,
        titleError: {
          error: true,
          message: "title cannot be empty",
        },
      });
      return false;
    } else if (!value.faculty) {
      setValue({
        ...value,
        facultyError: {
          error: true,
          message: "faculty cannot be empty",
        },
      });
      return false;
    } else if (!value.degree) {
      setValue({
        ...value,
        degreeError: {
          error: true,
          message: "degree cannot be empty",
        },
      });
      return false;
    } else if (!value.maxMembers) {
      setValue({
        ...value,
        maxMembersError: {
          error: true,
          message: "plese select project maximum members",
        },
      });
      return false;
    } else if (value.description) {
      setValue({
        ...value,
        descriptionError: {
          error: true,
          message: "Please enter description",
        },
      });
      return true;
    } else if (value.skills) {
      setValue({
        ...value,
        skillsError: {
          error: true,
          message: "enter skills",
        },
      });
      return true;
    } else return true;
  };

  function getSteps() {
    return ["Title & Details", "Description and Skills", "Create Project"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <TitleAndDetails props={{ value, setValue }} />;
      case 1:
        return <DescriptionAndSkills props={{ value, setValue }} />;
      case 2:
        return "You are all set!, Click finish to create your Project";
      default:
        return "Unknown step";
    }
  }

  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (validate()) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinised = async () => {
    const create = await createProject(value, authCtx.token);
    if (create.success) {
      await getLoggedInUserProjects();
      setOpenNewProject(false);
    } else {
      return;
    }
  };

  return (
    <Grid container direction="column">
      <Backdrop className={classes.backdrop} open={openNewProject}>
        <Paper className={classes.rootPaper}>
          <span className={classes.span} onClick={toggleNewProject}>
            <button type="button">
              <Tooltip title="close Dialog">
                <CloseIcon />
              </Tooltip>
            </button>
          </span>
          <Grid>
            <Typography variant="h5" gutterBottom>
              Create a New Project
            </Typography>
          </Grid>

          <Grid item>
            <div className={classes.root}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption"></Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                      Reset
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </div>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        style={{ width: 100 }}
                      >
                        PREVIOUS
                      </Button>
                      {isStepOptional(activeStep) && (
                        <Button
                          variant="contained"
                          onClick={handleSkip}
                          className={classes.button}
                        >
                          Skip
                        </Button>
                      )}

                      <Button
                        style={{}}
                        variant="contained"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? (
                          <span onClick={handleFinised}>Finish</span>
                        ) : (
                          "Next"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Paper>
      </Backdrop>
    </Grid>
  );
}
