import React, { useEffect, useState } from 'react';
import NavBar from './Components/NavBar/NavBar';
import { Grid, CssBaseline, Typography } from '@material-ui/core';
import Dashboard from './Pages/Dashboard/Dashboard';
import SearchProjects from './Pages/SearchProjects/SearchProjects';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MyProfile from './Pages/MyProfile/MyProfile';
import { AuthContextProvider } from './Store/AuthContext';
import Project from './Pages/Project/Project';
import { UserContextProvider } from './Store/UserContext';


const ProjectFinder = () => {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <UserContextProvider>
            
              <NavBar>
                <Grid container direction="column">
                  <Grid item container>
                    <Grid item xs={false} />
                    <Grid item xs={12}>
                      <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route
                          path="/project-finder"
                          exact
                          component={Dashboard}
                        />
                        <Route path="/profile" exact component={MyProfile} />

                        <Route
                          path="/search-projects"
                          exact
                          component={SearchProjects}
                        />

                        <Route
                          path="/search-projects/:id"
                          component={SearchProjects}
                        />
                        <Route path="/projects/:id" component={Project} />
                       

                        <Route path="**" component={Dashboard} />
                      </Switch>
                    </Grid>
                    <Grid item xs={false} />
                  </Grid>
                </Grid>
              </NavBar>
        
          </UserContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  );
};

export default ProjectFinder;
