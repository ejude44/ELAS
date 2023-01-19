import { Avatar } from '@material-ui/core';
import {
  deepOrange,
  deepPurple,
  blue,
  blueGrey,
  green,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
}));

export default function AvatarMyProject({ filteredMembers }) {
  const classes = useStyles();
  const colors = [classes.orange, classes.purple, classes.blue, classes.green];
  return (
    <>
      <Avatar sizes="small" className={colors[Math.floor(Math.random() * 3)]}>
        {filteredMembers
          ? Array.from(filteredMembers.firstname)[0].toUpperCase() +
            Array.from(filteredMembers.lastname)[0].toUpperCase()
          : ''}
      </Avatar>
    </>
  );
}
