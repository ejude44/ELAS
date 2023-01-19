import { Grid, Typography, makeStyles, Box } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import { useEffect } from 'react';
import ApplicationMember from '../../ApplicationMember/ApplicationMember';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    lineHeight: 2,
  },
}));

export default function Applications(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
          <div style={{ padding: 2 }}>
            <Grid item>
              <Typography className={classes.header}>Applications</Typography>
            </Grid>

            {memberships ? (
              <>
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
