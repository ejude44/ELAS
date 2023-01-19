import { Grid, Typography, makeStyles, Box } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from '@material-ui/core';
import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import TeamMember from '../../ApplicationMember/TeamMember';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'blockk',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      //   width: theme.spacing(30),
      //   height: theme.spacing(35),
    },
  },
  header: {
    fontWeight: 700,
    fontSize: 17,
    fontFamily: 'Roboto',
    font: 'Roboto',
    color: '#000000',
    lineHeight: 2
  },
  rootAvatar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    //   overflow: 'hidden',
    textOverflow: 'clip',
    marginLeft: 40,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export default function TeamMembers(props) {
  const classes = useStyles();
  const { teamMember, setOpen, handleReject, SETID, setIsClicked } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

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
                {teamMember.map((member, index) => (
                  <TeamMember
                    member={member}
                    key={index}
                    setOpen={setOpen}
                    handleProfile={handleProfile}
                    handleReject={handleReject}
                  />
                ))}
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
