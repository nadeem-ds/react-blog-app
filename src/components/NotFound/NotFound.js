import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Page from "../Page/Page";

const NotFound = () => {
  return (
    <div>
      {" "}
      <Page title="Not Found">
        <div className="text-center">
          <h2>Whoops, we cann't find that page</h2>
          <p className="lead text-muted">
            You can always visit the <Link to="/">Homepage</Link> to get a fresh
            start
          </p>
        </div>
      </Page>
    </div>
  );
};

export default NotFound;
