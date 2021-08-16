import React from "react";
import { Link } from "react-router-dom";
import Page from "./../layouts/Page";

function NotFound() {
  return (
    <Page title="Not found...">
      <h1 className="text-center fz-3 font-weight-bold">404...</h1>
      <p className="lead text-muted text-center">
        Woops... something was happening
      </p>
      <p className="text-center">
        Nothing not found, try on <Link to="/">home page</Link>
      </p>
    </Page>
  );
}
export default NotFound;
