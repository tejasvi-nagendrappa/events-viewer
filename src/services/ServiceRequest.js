const END_POINT = 'https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com';
const SERVER_ENV_TYPE = 'Prod';
const USER_NAME = 'frontend@shyftplan.com';
const PASSWORD = 'api_test_auth_token';

const buildApiUrl = (url) => {
  if (url) {
    const baseUrl = `${END_POINT}/${SERVER_ENV_TYPE}`;
    return `${baseUrl}${url}`;
  }
  return url;
}

const ServiceRequest = (config) =>  {
  const url = (config && config.url) || '';
  const auth = 'Basic ' + btoa(USER_NAME + ":" + PASSWORD);
  const requestConfig = {
    ...config,
    headers: new Headers({
      Authorization: auth,
    }),
    credentials:'same-origin',
    method: (config && config.method) || 'GET',
    body:
      config
      && config.method !== 'GET'
      && config.method !== 'HEAD'
      && JSON.stringify(config.requestParams),

  };

  const apiUrl = buildApiUrl(url, requestConfig);
  const req =  new Request(apiUrl, requestConfig);
  return req;
}

export { ServiceRequest as default };
