import { Grid, Typography } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Backdrop, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Chip } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      //   height: theme.spacing(10),
    },
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: '#FF6500',
    color: 'white',
  },
  details: {
    font: 'Roboto',
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 18,
    color: '#000000',
  },
  myName: {
    font: 'Roboto',
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 23,
    color: '#000000',
  },
  span: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
  },
  img: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

export default function MemberDetails(props) {
  const { open, toggleMemberDetails, selectedMember, isClicked } = props;
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <Paper className={classes.root}>
            <span className={classes.span} onClick={toggleMemberDetails}>
              <button type="button">
                <Tooltip title="close Dialog">
                  <CloseIcon />
                </Tooltip>
              </button>
            </span>
            <div style={{ padding: 10 }}>
              <Grid item className={classes.img}>
                <Avatar
                  alt="profile pic"
                  src={isClicked ? isClicked.foto : ''}
                  className={classes.large}
                />
              </Grid>
              <Grid item className={classes.name}>
                <Typography className={classes.myName}>
                  {isClicked ? isClicked.firstname : ''}{' '}
                  {isClicked ? isClicked.lastname : ''}
                </Typography>
              </Grid>
              <Typography className={classes.name}>
                {isClicked ? isClicked.degree : ''}
              </Typography>
              <Grid item>
                <Typography className={classes.details}>About me</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  {isClicked ? isClicked.description : ''}
                </Typography>
              </Grid>

              <Grid item>
                <Typography className={classes.details}>Skills</Typography>
                {/* <Typography>{isClicked ? isClicked.skills : ''}</Typography> */}

                {isClicked.skills ? (
                  <>
                    <Grid container spacing={1}>
                      {isClicked.skills.map((skill, index) => (
                        <Grid item key={index}>
                          <Chip label={skill} />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <CircularProgress />
                )}
              </Grid>
            </div>
          </Paper>
        </Backdrop>
      </div>
    </Grid>
  );
}
