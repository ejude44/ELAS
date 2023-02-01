import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from './../../reuse/files/Proj.png';

const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
  roots: {
    display: 'flex',
    // zIndex: -1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer - 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 60,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  active: {
    color: '#000000',
    backgroundColor: '#D9D9D9',
  },
}));

export default function NavBar(props) {
  const location = useLocation();
  const { id } = useParams();
  const { pathname } = location;
  const splitLocation = pathname.slice('/');

  const classes = useStyles();

  return (
    <div className={classes.roots}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar>
          <center>
            <Link to="/project-finder">
              <img
                src={logo}
                alt="logo"
                height="50"
                width="130"
                style={{ marginTop: 15, marginLeft: -8 }}
              />
            </Link>
          </center>
        </Toolbar>
        <div className={classes.drawerContainer}>
          <List>
            {/* <center>
              <Link to="/project-finder">
                <img
                  src={logo}
                  alt="logo"
                  height="50"
                  width="130"
                  style={{ marginBottom: 10 }}
                />
              </Link>
            </center> */}

            <NavLink to="/project-finder" className={classes.link}>
              <ListItem
                button
                className={`${
                  splitLocation === `/projects/${id}/details` ||
                  '/project-finder'
                    ? classes.active
                    : ''
                }`}
              >
                <ListItemText primary={'Dashboard'} />
              </ListItem>
            </NavLink>

            <Link
              to="/search-projects/search"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItem
                button
                className={`${
                  splitLocation === '/search-projects/search' ||
                  splitLocation === `/search-projects/search/recommended` ||
                  splitLocation === `/search-projects/search/applications`
                    ? classes.active
                    : ''
                }`}
              >
                <ListItemText primary={'Search Projects'} />
              </ListItem>
            </Link>

            <NavLink to="/profile" className={classes.link}>
              <ListItem
                button
                className={`${
                  splitLocation === '/profile' ? classes.active : ''
                }`}
              >
                <ListItemText primary={'My Profile'} />
              </ListItem>
            </NavLink>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}
