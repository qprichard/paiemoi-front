export class APIError extends Error {
  constructor(message, response, value) {
    super(message);
    this.response = response
    this.value = value;
  }

  get status(){
    return this.response.status;
  }
}

export class BaseModel {
  constructor(values) {
    Object.assign(this, values);
  }

  getKey(){
    return this.id;
  }
}
