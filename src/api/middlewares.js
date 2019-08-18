import { APIError } from "./utils";
/* Encode connector, it raises APIError if the response fails */
export function withAPIError(fetch) {
	return async (url, options) => {
		const response = await fetch(url, options);
		if (!response.ok) {
			try {
				const value = await response.json();
				throw new APIError(`${options.method || 'GET' } ${url} returned ${response.status}`, response, value);
			} catch (err) {
				throw new APIError(`${options.method || 'GET' } ${url} returned ${response.status}`);
			}
		}
		return response;
	};
}

function getDataFromResponse(response) {
  const contentType = response.headers.get('Content-Type') || '';
  if(contentType.indexOf('application/json') === -1) {
    return null;
  }

  return response.json();
}


function makeDispatchFetch(fetch, store) {
  return async (action) => {
    const { url, ...options } = action.request;
    const abortController = new AbortController();
    options.signal = abortController.signal;

    const request = fetch(url, options);

    store.dispatch({
      ...action,
      success: null,
      request: request,
      abort: () => abortController.abort()
    });

    let response = null;
    try {
      response = await request;
      const data = await getDataFromResponse(response);
      store.dispatch({
        ...action,
        success: true,
        request: request,
        response: response,
        data,
      });
    } catch (err) {
      store.dispatch({
        ...action,
        success: false,
        request: request,
        response: response,
        meta: err
      })
    }
  }
}

export function APIMiddleware(fetch=global.fetch, connectors) {
  connectors = connectors || APIMiddleware.connectors;
  return (store) => {
    fetch = connectors.reverse().reduce((f, connector) => connector(f, store), fetch);

    const dispatchFetch = makeDispatchFetch(fetch, store);
    return (next) => (action => {
      if(action.request && action.success === undefined) {
        return dispatchFetch(action);
      }
      return next(action);
    })
  }
}

APIMiddleware.connectors = [
  withAPIError,
]
