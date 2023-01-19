import { Typography, Grid, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SearchProjectsComp from '../../Components/SearchProject/SearchProject';
import RecommendedProjects from '../../Components/SearchProject/RecommendedProjects';
import ApplicationsS from '../../Components/SearchProject/Applications';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  active: {
    borderBottom: '2px solid #FF6500',
    // borderRadius: '6px',
    color: '#FF6500',
  },
  searchProject: {
    font: 'Roboto',
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 22,
  },
});

export default function SearchProjects() {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.slice('/');

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.searchProject}>
            Search Projects
          </Typography>
        </Grid>

        <Grid item>
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="white"
              centered
            >
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`${url}`}
                className={`${
                  splitLocation === '/search-projects/search'
                    ? classes.active
                    : ''
                }`}
              >
                <Tab label="Search Projects" />
              </Link>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`${url}/recommended`}
                className={`${
                  splitLocation === '/search-projects/search/recommended'
                    ? classes.active
                    : ''
                }`}
              >
                <Tab label="Recommended Projects" />
              </Link>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`${url}/applications`}
                className={`${
                  splitLocation === '/search-projects/search/applications'
                    ? classes.active
                    : ''
                }`}
              >
                <Tab label="Applications" />
              </Link>
            </Tabs>
          </Paper>
          <Switch>
            <Route path={`${path}/recommended`}>
              <RecommendedProjects />
            </Route>
            <Route path={`${path}/applications`}>
              <ApplicationsS />
            </Route>
            <Route path={`${path}/`}>
              <SearchProjectsComp />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </>
  );
}
