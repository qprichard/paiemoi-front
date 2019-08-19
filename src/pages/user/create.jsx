import React from "react";
import PropTypes from "prop-types";
import User from "models/user";
import { connect } from "react-redux";
import { users } from "api/state";
import { Input, Button, Grid, Form } from "semantic-ui-react";
import Segment from "pages/common/blocks/segment";
import { withRouter } from "react-router-dom";

const CreateUser = ({ user, create, clear, history }) => {

  React.useEffect(() => {
    if(user) {
      history.push({pathname: "/connect", state: { user }});
    }

    return () => clear()
  }, [user, history, clear]);

  const [formValues, setFormValues] = React.useState({});

  const handleCreate = () => create(formValues);

  return (

      <Form>
        <Grid centered>
          <Grid.Row>
            <Grid.Column computer="8" mobile="16">
              <Segment title="Inscription" center>
              <Form.Field>
                <label>Email</label>
                <Input placeholder='Email...' onChange={ (_,{ value }) => setFormValues({...formValues, email: value }) }/>
              </Form.Field>
              <Form.Field>
                <label>Mot de passe</label>
                <Input
                  type="password"
                  placeholder='Mot de passe...'
                  onChange={ (_,{ value }) => setFormValues({...formValues, password: value }) }
                  />
              </Form.Field>
              <Form.Field>
                <label>Nom</label>
                <Input placeholder="Nom..." onChange={ (_,{ value }) => setFormValues({...formValues, lastname: value }) }/>
              </Form.Field>
              <Form.Field>
                <label>Prénom</label>
                <Input placeholder="Prénom..." onChange={ (_,{ value }) => setFormValues({...formValues, firstname: value }) }/>
              </Form.Field>
              <Button
                primary
                disabled={ !formValues.email || !formValues.password   }
                onClick={ handleCreate }
                >
                S'inscrire
              </Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Form>
  )
}

CreateUser.propTypes = {
  user: PropTypes.instanceOf(User),
  create: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
}

CreateUser.defaultProps = {
  user: null,
}

const mapStateToProps = (state) => ({
  user: users.getCurrentFromState(state)
});

const mapDispatchToProps = (dispatch) => ({
  create: (values) => dispatch( users.create(values) ),
  clear: () => dispatch( users.setCurrent(null) ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUser))
