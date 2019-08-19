/**
 * Model User
 * @param {string} email
 * @param {string} lastname
 * @param {string} firstname
 * @param {string} id
**/
class User {
  constructor({
    id,
    email,
    lastname,
    firstname
  }) {
    this._id = id;
    this._email = email
    this._firstname = firstname;
    this._lastname = lastname;
  }

  getKey() {
    return this._id;
  }

  getEmail() {
    return this._email;
  }

  getFirstname() {
    return this._firstname;
  }

  getLastname() {
    return this._lastname;
  }
}

export default User;
