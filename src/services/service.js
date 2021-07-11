import ServiceRequest from './ServiceRequest';

const performFetch = async (config) => {
  const serviceRequest = ServiceRequest(config);
  const result = await fetch(serviceRequest);
  return result;
}

const fetchData = (config) => {
  return performFetch(config);
}

const handleResponse = (response) => {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else {
    throw new Error(`Content-type ${contentType} not supported`)
  }
}

const handleJSONResponse = async (response) => {
  try {
    const data = await response.json()
    return data;
  } catch (error) {
    return Promise.reject({
      statusCode: response.status,
      error
    });
  }
}

export {
  fetchData,
  handleResponse,
};
