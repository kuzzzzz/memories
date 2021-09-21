import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Container } from "@material-ui/core";

import NavBar from "./components/Nav/NavBar";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <NavBar />
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Redirect to="/posts" />}
          ></Route>
          <Route path="/posts" exact component={Home}></Route>
          <Route path="/posts/search" exact component={Home}></Route>
          <Route path="/posts/:id" exact component={PostDetails}></Route>
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          ></Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
