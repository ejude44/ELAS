import {
  Grid,
  Typography,
  makeStyles,
  Box,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { Paper } from '@material-ui/core';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Tooltip } from '@material-ui/core';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      // width: theme.spacing(30),
      //   height: theme.spacing(35),
    },
  },
  description: {
    font: 'Roboto',
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 21,
    color: '#000000',
  },
}));

export default function DescriptionAndSkills(props) {
  const classes = useStyles();
  const { value, handleOnEditDescSkillsClick } = props;

  return (
    <>
      <Grid container direction="column">
        <Paper className={classes.root}>
          <div style={{ padding: 10 }}>
            <Grid item>
              <Typography className={classes.description}>
                Description and skills
                <Tooltip title="Click to edit description and skills">
                  <EditOutlinedIcon
                    onClick={handleOnEditDescSkillsClick}
                    fontSize="small"
                    style={{ color: '#FF6500' }}
                  />
                </Tooltip>
              </Typography>
              <Grid item>
                <Typography>{value.description}</Typography>
                <Divider></Divider>
                <Typography className={classes.description}>
                  Skills Required
                </Typography>
                <Typography>works on skills</Typography>

                {value.skills ? (
                  <>
                    <Grid container spacing={1}>
                      {value.skills.map((skill, index) => (
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
            </Grid>
            {/* <Grid item>
              {value.description}
              <Divider></Divider>
              {value.skills}
            </Grid> */}
          </div>
        </Paper>
      </Grid>
    </>
  );
}
