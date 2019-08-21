import React from "react";
import PropTypes from "prop-types";
import User from "models/user";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout as apiLogout, isLogged, getConnectedUser } from "api/connect/state";

const Header = ({ logged, logout, user }) => {


  const handleLogout = React.useCallback(() => {
    if(logged) {
      return logout();
    }
    return null;
  }, [logged, logout]);

  const connectButton = logged ? "Déconnexion" : "Connexion";
  const informations = ( logged && user ) ?  <span className="header-user"> - { user.getFirstname() } { user.getLastname() }</span> : null;
  return (
    <div className="application-header">
      <div className="application-title">PAIEMOI { informations }</div>
      <div className="application-connexion">
        <Link to="/connect" onClick={ handleLogout }>{ connectButton }</Link> / <Link to="/subscribe">Inscription</Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  logged: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User)
}

Header.defaultProps = {
  user: null,
}

const mapStateToProps = (state) => ({
  logged: isLogged(state),
  user: getConnectedUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(apiLogout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
