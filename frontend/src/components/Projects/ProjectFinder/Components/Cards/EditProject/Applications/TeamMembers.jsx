import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import TeamMember from '../../ApplicationMember/TeamMember';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  header: {
    fontWeight: 700,
    fontSize: 17,
    fontFamily: 'Roboto',
    font: 'Roboto',
    color: '#000000',
    lineHeight: 2,
  },
  member: {
    lineHeight: 3,
  },

  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export default function TeamMembers(props) {
  const classes = useStyles();
  const { teamMember, setOpen, handleReject, SETID, setIsClicked } = props;

  const handleProfile = (g) => {
    SETID(g);

    setIsClicked(teamMember.find((x) => x.id === g));
  };

  return (
    <>
      <Grid container direction="column">
        <Paper className={classes.root}>
          <div style={{ padding: 1 }}>
            <Grid item>
              <Typography className={classes.header}>Team Members</Typography>
            </Grid>

            {teamMember ? (
              <>
                <Grid item className={classes.member}>
                  {teamMember.map((member, index) => (
                    <TeamMember
                      member={member}
                      key={index}
                      setOpen={setOpen}
                      handleProfile={handleProfile}
                      handleReject={handleReject}
                    />
                  ))}
                </Grid>
              </>
            ) : (
              <CircularProgress />
            )}
          </div>
        </Paper>
      </Grid>
    </>
  );
}
