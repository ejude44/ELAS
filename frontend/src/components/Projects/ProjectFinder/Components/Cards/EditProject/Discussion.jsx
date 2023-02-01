import {
  Grid,
  Typography,
  makeStyles,
  Box,
  TextField,
  Divider,
} from '@material-ui/core';
import { Paper } from '@material-ui/core';

import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { deepOrange } from '@material-ui/core/colors';
import { Avatar } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { List } from '@material-ui/core';
import Comments from '../../Comments/Comments';
import { useCreateComment } from '../../../api/discussion/hooks';
import { useComments } from '../../../api/discussion/hooks';
import { CircularProgress } from '@material-ui/core';
import { useContext } from 'react';
import UserContext from '../../../Store/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
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
  questions: {
    lineHeight: 2,
  },
}));

export default function Discussion({ id }) {
  const userCtx = useContext(UserContext);
  const { createComment } = useCreateComment(id, userCtx.id);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [loadedComments, setLoadedComments] = useState([]);

  const { comments, refetch } = useComments(id);
  const [value, setValue] = useState({
    comment: '',
    user: userCtx.id,
    project_id: id,
    created_at: new Date(),
    parent: '',
  });

  useEffect(() => {
    if (comments !== undefined && comments !== null) {
      const hasComment = comments.filter(
        (comm) => comm.project_id == id && comm.children === ''
      );
      if (hasComment) {
        setLoadedComments(hasComment);
        setQuestionsCount(hasComment.length);
      }
    }
  }, [comments]);

  const onChange = (event) => {
    setValue({ ...value, 'comment': event.target.value });
  };

  const handleSendComment = async () => {
    if (value.comment === '') {
      return;
    } else {
      await createComment(value, value.parent);

      await refetch();

      setValue({ ...value, 'comment': '' });
    }
  };

  const classes = useStyles();

  return (
    <>
      <Grid container direction="column">
        <Paper
          className={classes.root}
          style={{ maxHeight: 400, overflow: 'auto', padding: 5 }}
        >
          <List>
            <Grid container>
              <Grid item xs={2}>
                <Avatar className={classes.orange} style={{ marginRight: 5 }}>
                  {userCtx
                    ? Array.from(userCtx.firstName)[0].toUpperCase() +
                      Array.from(userCtx.lastName)[0].toUpperCase()
                    : ''}
                </Avatar>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  multiline
                  rowsMax={3}
                  type="text"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={onChange}
                  value={value.comment}
                  style={{ marginRight: 5 }}
                  placeholder="Ask a Question"
                />
              </Grid>
              <Grid item xs={2}>
                <div onClick={handleSendComment}>
                  <SendOutlinedIcon style={{ color: 'FF6500' }} />
                </div>
              </Grid>
            </Grid>

            <Grid item>
              <Typography
                gutterBottom
                className={classes.questions}
                style={{ fontSize: 12 }}
              >
                {questionsCount} Question(s)
              </Typography>
            </Grid>

            <Grid item>
              {loadedComments ? (
                <>
                  {loadedComments.map((comment, index) => (
                    <Grid item xs={12} key={index}>
                      <Grid container key={Math.random() * 10}>
                        <Comments comment={comment} id={id} refetch={refetch} />
                      </Grid>
                      <Divider></Divider>
                    </Grid>
                  ))}
                </>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          </List>
        </Paper>
      </Grid>
    </>
  );
}
