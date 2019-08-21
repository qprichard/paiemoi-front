import config from "config/config";
const { PAIEMOI_API } = config;

export const fetch_ = async (options={}) => {
  const headers = options.headers = options.headers || {};
  headers["Content-Type"] = "application/json";
  options.method = 'POST';
  options.body = options.data ? JSON.stringify(options.data) : {};
  delete options.data;


  return fetch(`${PAIEMOI_API}/authenticate`, options).then(
    async (response) => {
      if(!response.ok) {
        throw response.message;
      }
      const contentType = response.headers.get('Content-Type') || '';
      if(contentType.indexOf('application/json') === -1) {
        return null;
      }
      response = await response.json();
      window.localStorage.setItem('userToken', JSON.stringify(response));

      return response;

    }
  ).catch( (err) => err )
}

export const checkLocalStorage = () => {
  let localStorage = window.localStorage.getItem('userToken');
  localStorage = JSON.parse(localStorage);
  if(!localStorage || !localStorage.token) {
    return Promise.resolve(null);
  }

  const options = {
    headers: {
      'Content-Type': "application/json",
      'Access-Control-Origin':"*",
      'Authorization': localStorage.token,
    },
  }
  return fetch(`${PAIEMOI_API}/authorize`,options).then(
    (response) => {
      if(!response.ok) {
        return null;
      }
      return localStorage;
    }
  ).catch(
    (err) => {
      return err;
    }
  )
}

export const clearLocalStorage = async () => {
  await window.localStorage.removeItem('userToken');
}
