import React from "react";
import { Switch, Route } from "react-router-dom";
import Fetch from "./Fetch";
import Create from "./Create";
import Files from "./Files";
import Jsonfilehistory from "./Jsonfilehistory"
import Filecontent from "./Filecontent"
import CreateFile from "./CreateFile"
import Versionsystem from "./Versionsystem"
import { useHistory, useLocation } from "react-router-dom";

const Main = () => {
  const history = useHistory();
  const location = useLocation();

  const fetch = (di) => {
    history.push(di);
  };
  const active = (loc) => {
    console.log(location.pathname, loc);
    if (location.pathname === loc) {
      return {
        backgroundColor: "#cccccc",
        color: "#0061a8",
      };
    }
  };
  return (
    <div className="main">
      <div className="main-1">
        <span onClick={() => fetch("/fetch")} style={active("/fetch")}>
          <i className="fas fa-file-download"></i> FileSystem Fetch
        </span>
        <span onClick={() => fetch("/create")} style={active("/create")}>
          <i className="far fa-plus-square"></i> FileSystem Create
        </span>
      </div>
      <div>
        <Switch>
          <Route exact path="/fetch" component={Fetch} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/fetch/files" component={Files} />
          <Route exact path="/fetch/file-history" component={Jsonfilehistory} />
          <Route exact path="/fetch/file-content" component={Filecontent} />
          {/* <Route exact path="/fetch/version-content" component={Versioncontent} /> */}
          <Route exact path="/create/create-file" component={CreateFile} />
          <Route exact path="/create/version-system" component={Versionsystem} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
