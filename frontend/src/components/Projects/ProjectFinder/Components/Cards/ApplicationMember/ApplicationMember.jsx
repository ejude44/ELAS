import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as React from "react";
import { Grid, makeStyles, Typography, Divider } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { blue } from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  blue: {
    color: theme.palette.getContrastText(blue[800]),
    backgroundColor: blue[800],
  },
}));

export default function ApplicationMember({
  filteredMembers,
  handleProfile,
  setOpen,
  handleAccept,
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
          <Avatar className={classes.blue}>
            {filteredMembers
              ? Array.from(filteredMembers.firstname)[0].toUpperCase() +
                Array.from(filteredMembers.lastname)[0].toUpperCase()
              : ""}
          </Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            {filteredMembers.firstname + " " + filteredMembers.lastname}
          </Typography>
        </Grid>
        <Grid item xs={2} onClick={() => handleProfile(filteredMembers.id)}>
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
                <DoneOutlinedIcon fontSize="small" style={{ color: "green" }} />
                Accept Application
              </span>
            </MenuItem>
            <Divider></Divider>
            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: 12 }} onClick={handleReject}>
                <ClearOutlinedIcon fontSize="small" style={{ color: "red" }} />
                Reject Application
              </span>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
}
