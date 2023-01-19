import { Typography, Container, Grid, Divider } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

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
    margin: 5,
  },
}));

export default function Reply({ reply }) {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Grid container>
          <Grid item key={Math.random() * 10} className={classes.grid}>
            <Grid item style={{ display: 'flex' }}>
              {/* {setParentId(comment.id)} */}
              <Avatar className={classes.orange} style={{ marginRight: 10 }}>
                {reply
                  ? Array.from(reply.firstname)[0].toUpperCase() +
                    Array.from(reply.lastname)[0].toUpperCase()
                  : ''}
              </Avatar>
              {reply.firstname + ' ' + reply.lastname}
              <span style={{ display: 'block' }}>
                <ReactTimeAgo date={reply.created_at} locale="en-US" />
              </span>
            </Grid>

            {reply.description}
            <Divider></Divider>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
