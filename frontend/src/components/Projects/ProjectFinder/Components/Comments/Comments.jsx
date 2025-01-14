import {
  Typography,
  Grid,
  Divider,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { Avatar } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import UserContext from "../../Store/UserContext";
import { useContext } from "react";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Reply from "../Reply/Reply";
import { useCreateComment } from "../../api/discussion/hooks";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";

TimeAgo.addLocale(en);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      // margin: theme.spacing(1),
      // width: theme.spacing(30),
      // height: theme.spacing(100),
    },
  },
  startDiscussion: {
    display: "flex",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  grid: {
    border: "2px solid grey",
    borderRadius: 5,
    padding: 4,
    width: "inherit",
    margin: 1,
  },
}));

export default function Comments({ comment, id, loadedReplies, refetch }) {
  const userCtx = useContext(UserContext);
  const { createComment } = useCreateComment(id, userCtx.id);
  const [value, setValue] = useState({
    comment: "",
    user: userCtx.id,
    project_id: id,
    created_at: new Date(),
  });

  const onChangeReply = (event) => {
    setValue({ ...value, comment: event.target.value });
  };

  const handleReply = async (e, parentId) => {
    if (value.comment === "") {
      return;
    } else {
      await createComment(value, parentId);
      await refetch();
      setValue({ ...value, comment: "" });
    }
  };
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item key={Math.random() * 10} className={classes.grid}>
          <Grid container>
            <Grid item xs={2}>
              <Avatar className={classes.orange}>
                {comment
                  ? Array.from(comment.firstname)[0].toUpperCase() +
                    Array.from(comment.lastname)[0].toUpperCase()
                  : ""}
              </Avatar>
            </Grid>
            <Grid item xs={8}>
              <Grid item>
                <Typography variant="body1">
                  {comment.firstname + " " + comment.lastname}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ fontSize: 12 }}
                >
                  <ReactTimeAgo
                    date={Date.parse(comment.created_at)}
                    locale="en-US"
                  />
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <MoreVertOutlinedIcon
                style={{ color: "#FF6500" }}
              ></MoreVertOutlinedIcon>
            </Grid>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="body1">
              {comment.description}
            </Typography>
          </Grid>
          <Divider></Divider>
          <Typography gutterBottom style={{ fontSize: 12 }}>
            see comment(s)
          </Typography>
          <Grid item>
            {loadedReplies ? (
              <>
                {loadedReplies.map((reply, index) => (
                  <Grid item key={index}>
                    {/* eslint-disable-next-line eqeqeq */}
                    {reply.children == comment.id ? (
                      <Reply reply={reply} />
                    ) : (
                      ""
                    )}
                  </Grid>
                ))}
              </>
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Grid>
        <Grid item style={{ display: "flex" }}>
          <TextField
            multiline
            rowsMax={2}
            onChange={onChangeReply}
            type="text"
            size="small"
            variant="outlined"
            fullWidth
            value={value.comment}
            style={{ marginRight: 5 }}
            placeholder="Reply to Question"
          />
          <div onClick={(e) => handleReply(e, comment.id)}>
            <SendOutlinedIcon style={{ color: "FF6500" }} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
