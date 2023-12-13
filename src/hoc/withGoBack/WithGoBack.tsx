import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

const withGoBack: FunctionComponent<RouteComponentProps> = props => {
  return (
    <>
      <button className="button icon-left" onClick={props.history.goBack}>
        Back
      </button>
    </>
  );
};

export default withRouter(withGoBack);
