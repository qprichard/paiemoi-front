import React from "react";
import PropTypes from "prop-types";
import User from "models/user";
import { connect } from "react-redux";
import { users } from "api/state";
import { Input, Button, Grid, Form, Icon } from "semantic-ui-react";
import Segment from "pages/common/blocks/segment";
import { withRouter } from "react-router-dom";

const CreateUser = ({ user, create, history }) => {

  React.useEffect(() => {
    if(user) {
      history.push({pathname: "/connect", state: { user }});
    }
  }, [user, history]);

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [lastname, setLastname] = React.useState(null);
  const [firstname, setFirstname] = React.useState(null);

  const handleCreate = () => create({
    email,
    password,
    lastname,
    firstname
  });

  return (

      <Form>
        <Grid centered>
          <Grid.Row>
            <Grid.Column computer="8" mobile="16">
              <Segment title="Inscription" center>
              <Form.Field>
                <label>Email</label>
                <Input placeholder='Email...' onChange={ (_,{ value }) => setEmail(value) }/>
              </Form.Field>
              <Form.Field>
                <label>Mot de passe</label>
                <Input
                  type="password"
                  placeholder='Mot de passe...'
                  onChange={ (_,{ value }) => setPassword(value) }
                  />
              </Form.Field>
              <Form.Field>
                <label>Nom</label>
                <Input placeholder="Nom..." onChange={ (_,{ value }) => setLastname(value) }/>
              </Form.Field>
              <Form.Field>
                <label>Prénom</label>
                <Input placeholder="Prénom..." onChange={ (_,{ value }) => setFirstname(value) }/>
              </Form.Field>
              <Button
                primary
                disabled={ !email || !password || !lastname || !firstname }
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
  history: PropTypes.any.isRequired,
}

CreateUser.defaultProps = {
  user: null,
}

const mapStateToProps = (state) => ({
  user: users.getCurrentFromState(state)
});

const mapDispatchToProps = (dispatch) => ({
  create: (values) => dispatch( users.create(values) )
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUser))
