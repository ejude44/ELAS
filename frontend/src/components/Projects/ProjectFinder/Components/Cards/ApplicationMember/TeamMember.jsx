import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as React from "react";
import { Grid, makeStyles, Typography, Divider } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  deepOrange,
  deepPurple,
  blue,
  yellow,
  green,
} from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[800]),
    backgroundColor: blue[800],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[700]),
    backgroundColor: yellow[700],
  },
  span: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
  },
}));

export default function TeamMember({
  member,
  handleProfile,
  setOpen,
  handleReject,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container direction="column">
      <Grid container>
        <Grid item xs={2}>
          <Avatar className={classes.green}>
            {member
              ? Array.from(member.firstname)[0].toUpperCase() +
                Array.from(member.lastname)[0].toUpperCase()
              : ""}
          </Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography>{member.firstname + " " + member.lastname}</Typography>
        </Grid>
        <Grid item xs={2} onClick={() => handleProfile(member.id)}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon
              style={{
                color: "#FF6500",
              }}
            />
          </IconButton>

          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: 12 }} onClick={() => setOpen(true)}>
                <VisibilityIcon fontSize="small" /> View Profile
              </span>
            </MenuItem>
            <Divider></Divider>
            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: 12 }} onClick={handleReject}>
                <ClearOutlinedIcon fontSize="small" style={{ color: "red" }} />
                Remove from Team
              </span>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
}
