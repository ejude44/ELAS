import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as React from "react";
import { Grid, makeStyles, Divider, Typography } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { deepOrange } from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
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
}));

export default function RejectedMembers({
  rejected,
  handleProfile,
  setOpen,
  handleAccept,
  handleRemove,
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
    <Grid item className={classes.grid}>
      <Grid container>
        <Grid item xs={2}>
          <Avatar className={classes.orange}>
            {rejected
              ? Array.from(rejected.firstname)[0].toUpperCase() +
                Array.from(rejected.lastname)[0].toUpperCase()
              : ""}
          </Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            {rejected.firstname + " " + rejected.lastname}
          </Typography>
        </Grid>
        <Grid item xs={2} onClick={() => handleProfile(rejected.id)}>
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
                {" "}
                <VisibilityIcon fontSize="small" /> View Profile
              </span>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: 12 }} onClick={handleAccept}>
                <DoneOutlinedIcon fontSize="small" style={{ color: "green" }} />{" "}
                Accept Application
              </span>
            </MenuItem>
            <Divider></Divider>
            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: 12 }} onClick={handleRemove}>
                <ClearOutlinedIcon fontSize="small" style={{ color: "red" }} />{" "}
                Remove
              </span>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
}
