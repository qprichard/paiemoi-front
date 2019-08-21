import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateTokenFromLocalStorage, isLogged, isPending } from "api/connect/state";
import { withRouter } from "react-router-dom";

const AuthController = ({ utfls, history, location, logged, pending, children }) => {
  React.useEffect(() => {
    utfls();
  }, [utfls]);

  React.useEffect(() => {
    if(location.pathname!=="/connect" &&  location.pathname!=="/subscribe" && !pending && !logged) {
      history.push("/connect");
    }
  }, [logged, location, pending]);

  return children;
}

AuthController.propTypes = {
  utfls: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  history: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  pending: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  logged: isLogged(state),
  pending: isPending(state),
});
const mapDispatchToProps = (dispatch) => ({
  utfls: () => dispatch(updateTokenFromLocalStorage()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthController));
