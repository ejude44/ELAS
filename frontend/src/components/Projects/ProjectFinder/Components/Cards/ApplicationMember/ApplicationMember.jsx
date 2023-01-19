import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import { Grid, Box, makeStyles, Divider } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  deepOrange,
  deepPurple,
  blue,
  yellow,
  green,
} from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  rootAvatar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
  },
  Box: {
    display: 'flex',
  },
  Avatar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // whiteSpace: 'nowrap',
    // textOverflow: 'clip',
    marginLeft: 20,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[800]),
    backgroundColor: deepPurple[800],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
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
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
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
  const colors = [classes.orange, classes.purple, classes.blue, classes.green, classes.yellow];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid item onClick={() => handleProfile(filteredMembers.id)}>
      <Box className={classes.Box}>
        <Box className={classes.Avatar}>
          <Avatar className={colors[Math.floor(Math.random() * 5)]}>
            {filteredMembers
              ? Array.from(filteredMembers.firstname)[0].toUpperCase() +
                Array.from(filteredMembers.lastname)[0].toUpperCase()
              : ''}
          </Avatar>
        </Box>

        <Box className={classes.name}>
          {filteredMembers.firstname + ' ' + filteredMembers.lastname}
        </Box>

        <Box className={classes.rootAvatar}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon
              style={{
                color: '#FF6500',
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
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: 12 }} onClick={() => setOpen(true)}>
                {' '}
                <VisibilityIcon fontSize="small" /> View Profile
              </span>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: 12 }} onClick={handleAccept}>
                <DoneOutlinedIcon fontSize="small" style={{ color: 'green' }} />{' '}
                Accept Application
              </span>
            </MenuItem>
            <Divider></Divider>

            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: 12 }} onClick={handleReject}>
                <ClearOutlinedIcon fontSize="small" style={{ color: 'red' }} />{' '}
                Reject Application
              </span>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Grid>
  );
}
