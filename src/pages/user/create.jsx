import React from "react";
import PropTypes from "prop-types";
import User from "models/user";
import { connect } from "react-redux";
import { users } from "api/state";
import { Input, Button, Grid, Form } from "semantic-ui-react";

const CreateUser = ({ user, create }) => {

  React.useEffect(() => {
    if(user) {
      console.log('user created >', user.getEmail())
    }
  }, [user]);

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
          <Grid.Column width="8">
            <Form.Field>
              <label>Email</label>
              <Input placeholder='Email...' onChange={ (_,{ value }) => setEmail(value) }/>
            </Form.Field>
            <Form.Field>
              <label>Mot de passe</label>
              <Input placeholder='Mot de passe...' onChange={ (_,{ value }) => setPassword(value) }/>
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
              disabled={ !email || !password || !lastname || !firstname }
              onClick={ handleCreate }
              >
              S'inscrire
            </Button>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Form>
  )
}

CreateUser.propTypes = {
  user: PropTypes.instanceOf(User),
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
