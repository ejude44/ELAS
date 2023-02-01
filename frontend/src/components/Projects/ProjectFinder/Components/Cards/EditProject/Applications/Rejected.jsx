import { Grid, Typography, makeStyles} from '@material-ui/core';
import { Paper } from '@material-ui/core';
import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

import RejectedMembers from '../../ApplicationMember/RejectedMembers';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    
    },
  },
 
 
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
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

export default function Rejected(props) {
  const classes = useStyles();
  const { rejected, setOpen, handleRemove, SETID, setIsClicked, handleAccept } =
    props;

  

  const handleProfile = (g) => {
    SETID(g);

    setIsClicked(rejected.find((x) => x.id === g));
  };

  return (
    <>
      <Grid container direction="column">
        <Paper className={classes.root}>
          <div style={{ padding: 1 }}>
            <Grid item>
              <Typography className={classes.header}>Rejected</Typography>
            </Grid>

            {rejected ? (
              <>
                {rejected.map((rejected, index) => (
                  <RejectedMembers
                    rejected={rejected}
                    key={index}
                    setOpen={setOpen}
                    handleProfile={handleProfile}
                    handleRemove={handleRemove}
                    handleAccept={handleAccept}
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
