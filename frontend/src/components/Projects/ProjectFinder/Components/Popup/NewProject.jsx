import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TitleAndDetails from '../NewProjectForm/TitleAndDetail';
import DescriptionAndSkills from '../NewProjectForm/DescriptionAndSkills';
import { Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useCreateProject } from '../../api/project/hooks';
import { useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: '#FF6500',
    color: 'white',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  rootPaper: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: 'inherit',
    },
  },
  span: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
  },
}));

export default function NewProject(props) {
  const history = useHistory();
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
    'title': '',
    'faculty': '',
    'degree': '',
    'maxMembers': '',
    'description': '',
    'skills': '',
  });

  function getSteps() {
    return ['Title & Details', 'Description and Skills', 'Create Project'];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <TitleAndDetails props={{ value, setValue }} />;
      case 1:
        return <DescriptionAndSkills props={{ value, setValue }} />;
      case 2:
        return 'You are all set!, Click finish';
      default:
        return 'Unknown step';
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
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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
    await createProject(value, authCtx.token);
    await getLoggedInUserProjects();
    setOpenNewProject(false);
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
          <div style={{ padding: 1 }}>
            <Typography variant="h5">Create a New Project</Typography>
          </div>

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
                        variant="contained"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? (
                          <span onClick={handleFinised}>Finish</span>
                        ) : (
                          'Next'
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
