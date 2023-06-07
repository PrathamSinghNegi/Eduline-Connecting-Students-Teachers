import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateEducatorRoute = ({
  component: Component,
  authEducator: { isEducatorAuthenticated, loadingEducator },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isEducatorAuthenticated && !loadingEducator ? (
        <Redirect to="/loginEducator" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateEducatorRoute.propTypes = {
  authEducator: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  authEducator: state.authEducator,
});

export default connect(mapStateToProps)(PrivateEducatorRoute);
