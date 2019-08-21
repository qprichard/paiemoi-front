import React from "react";
import PropTypes from "prop-types";
import Segment from "pages/common/blocks/segment";
import { login, isLogged } from "api/connect/state";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Input, Button, Grid, Form } from "semantic-ui-react";

const Connect = ({ logged, connect, history }) => {

  React.useEffect(() => {
    if(logged) {
      history.push('/home');
    }
  }, [logged, history]);

  const [formValues, setFormValues] = React.useState({});

  const handleConnect = React.useCallback(() => connect(formValues), [formValues, connect]);

  return (
    <Form>
      <Grid centered>
        <Grid.Row>
          <Grid.Column computer="8" mobile="16">
            <Segment title="Connexion" center>
              <Form.Field>
                <label>Email</label>
                <Input placeholder="Email..." onChange={(_,{value}) => setFormValues({...formValues, email: value})}/>
              </Form.Field>
              <Form.Field>
                <label>Mot de passe</label>
                <Input type="password" placeholder="Mot de pass..." onChange={(_,{value}) => setFormValues({...formValues, password: value})}/>
              </Form.Field>
              <Button primary onClick={ handleConnect }>Se connecter</Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

Connect.propTypes = {
  logged: PropTypes.bool.isRequired,
  connect: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
}

const mapStateToProps = (state) => ({
  logged: isLogged(state),
})

const mapDispatchToProps = (dispatch) => ({
  connect: (values) => dispatch(login(values))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Connect));
