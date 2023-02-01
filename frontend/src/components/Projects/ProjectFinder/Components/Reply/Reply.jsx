import { Typography, Container, Grid, Divider } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

TimeAgo.addLocale(en);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      // margin: theme.spacing(1),
      // width: theme.spacing(30),
      height: theme.spacing(100),
    },
  },
  startDiscussion: {
    display: 'flex',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  grid: {
    border: '1px solid grey',
    borderRadius: 5,
    padding: 5,
    margin: 0,
    width: 'inherit',
    backgroundColor: '#edebeb',
  },
}));

export default function Reply({ reply }) {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item key={Math.random() * 10} className={classes.grid}>
          <Grid container>
            <Grid item xs={2}>
              <Avatar className={classes.orange} style={{ marginRight: 10 }}>
                {reply
                  ? Array.from(reply.firstname)[0].toUpperCase() +
                    Array.from(reply.lastname)[0].toUpperCase()
                  : ''}
              </Avatar>
            </Grid>
            <Grid item xs={8}>
              <Grid item>
                <Typography variant="body1">
                  {reply.firstname + ' ' + reply.lastname}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ fontSize: 12 }}
                >
                  <ReactTimeAgo
                    date={Date.parse(reply.created_at)}
                    locale="en-US"
                  />
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <MoreVertOutlinedIcon
                style={{ color: '#FF6500' }}
              ></MoreVertOutlinedIcon>
            </Grid>
          </Grid>

          <Typography>{reply.description}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
