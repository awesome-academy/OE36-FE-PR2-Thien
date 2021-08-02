import Admin from "pages/admin";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./layouts/footer";
import Header from "./layouts/header";
import Main from "./layouts/main";

function App() {
  return (
    <Switch>
      <Route path="/admin" exact={true} render={() => <Admin />} />
      <Route
        render={() => (
          <>
            <Header />
            <Main />
            <Footer />
          </>
        )}
      />
    </Switch>
  );
}

export default App;
