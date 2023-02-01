import { Grid, Typography, makeStyles, Box } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import ApplicationMember from '../../ApplicationMember/ApplicationMember';

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
}));

export default function Applications(props) {
  const {
    memberships,
    SETID,
    setOpen,
    setIsClicked,
    handleAccept,
    handleReject,
  } = props;

  const handleProfile = (g) => {
    SETID(g);

    setIsClicked(memberships.find((x) => x.id === g));
  };

  const classes = useStyles();

  return (
    <>
      <Grid container direction="column">
        <Paper className={classes.root}>
          <div style={{ padding: 1 }}>
            <Grid item>
              <Typography className={classes.header}>Applications</Typography>
            </Grid>

            {memberships ? (
              <>
                <Grid item>
                  {memberships.map((filteredMembers, index) => (
                    <ApplicationMember
                      filteredMembers={filteredMembers}
                      key={index}
                      setOpen={setOpen}
                      handleProfile={handleProfile}
                      handleAccept={handleAccept}
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
