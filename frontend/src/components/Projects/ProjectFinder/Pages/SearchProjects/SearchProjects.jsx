import { Typography, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";
import SearchProjectsComp from "../../Components/SearchProject/SearchProject";
import RecommendedProjects from "../../Components/SearchProject/RecommendedProjects";
import ApplicationsS from "../../Components/SearchProject/Applications";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  active: {
    borderBottom: "2px solid #FF6500",
    // borderRadius: '6px',
    color: "#FF6500",
  },
  searchProject: {
    fontWeight: 400,
    fontSize: 22,
  },
  navItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});

export default function SearchProjects() {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.slice("/");
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
            <Grid item className={classes.navItems}>
              <Link
                style={{ textDecoration: "none", color: "black", margin: 30 }}
                to={`${url}`}
                className={`${
                  splitLocation === "/search-projects/search"
                    ? classes.active
                    : ""
                }`}
              >
                <Typography>
                  <b>Search Projects</b>
                </Typography>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black", margin: 30 }}
                to={`${url}/recommended`}
                className={`${
                  splitLocation === "/search-projects/search/recommended"
                    ? classes.active
                    : ""
                }`}
              >
                <Typography>
                  <b>Recommendations</b>
                </Typography>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black", margin: 30 }}
                to={`${url}/applications`}
                className={`${
                  splitLocation === "/search-projects/search/applications"
                    ? classes.active
                    : ""
                }`}
              >
                <Typography>
                  <b>Applications</b>
                </Typography>
              </Link>
            </Grid>
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
