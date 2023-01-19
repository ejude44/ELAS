import {
  Typography,
  Container,
  Box,
  Grid,
  Divider,
  makeStyles,
  TextField,
  Input,
} from '@material-ui/core';

import { CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import UserContext from '../../Store/UserContext';
import { useContext } from 'react';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Reply from '../Reply/Reply';
import { useComments, useCreateComment } from '../../api/discussion/hooks';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addLocale(en);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      // margin: theme.spacing(1),
      // width: theme.spacing(30),
      // height: theme.spacing(100),
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
    padding: 4,
    width: 'inherit',

    margin: 5,
  },
}));

export default function Comments({ comment, id, comments }) {
  const userCtx = useContext(UserContext);
  const { refetch } = useComments(id);
  const { createComment } = useCreateComment(id, userCtx.id);
  const [loadedReplies, setLoadedReplies] = useState();

  useEffect(() => {
    if (comments !== undefined && comments !== null) {
      const hasReply = comments.filter(
        (comm) => comm.project_id == id && comm.children !== ''
      );
      if (hasReply) {
        setLoadedReplies(hasReply);
      }
    }
  }, [comments, comment]);

  const [value, setValue] = useState({
    comment: '',
    user: userCtx.id,
    project_id: id,
    created_at: new Date(),
  });

  const onChange = (event) => {
    setValue({ ...value, 'comment': event.target.value });
  };

  const handleReply = async (e, parentId) => {
    if (value.comment === '') {
      return;
    } else {
      createComment(value, parentId);
      setValue({ ...value, 'comment': '' });
      await refetch();
    }
  };
  const classes = useStyles();

  return (
    <>
      <Container>
        <Grid container>
          <Grid item key={Math.random() * 10} className={classes.grid}>
            <Grid item style={{ display: 'flex' }}>
              <Avatar className={classes.orange} style={{ marginRight: 10 }}>
                {comment
                  ? Array.from(comment.firstname)[0].toUpperCase() +
                    Array.from(comment.lastname)[0].toUpperCase()
                  : ''}
              </Avatar>{' '}
              {comment.firstname + ' ' + comment.lastname}
            </Grid>
            <span style={{ display: 'block' }}>
              <ReactTimeAgo date={comment.created_at} locale="en-US" />
            </span>

            {comment.description}
            <Divider></Divider>
            <Grid item>
              {loadedReplies ? (
                // <Container>
                <>
                  {loadedReplies.map((reply, index) => (
                    <Grid item xs={12} key={index}>
                      <Grid container key={Math.random() * 10}>
                        {reply.children == comment.id ? (
                          <Reply reply={reply} />
                        ) : (
                          ''
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </>
              ) : (
                // </Container>
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid item style={{ display: 'flex' }}>
            <TextField
              multiline
              rowsMax={2}
              onChange={onChange}
              type="text"
              size="small"
              variant="outlined"
              fullWidth
              value={value.comment}
              style={{ marginRight: 10 }}
              placeholder="Reply to Question"
            />
            <div onClick={(e) => handleReply(e, comment.id)}>
              <SendOutlinedIcon style={{ color: 'FF6500' }} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
