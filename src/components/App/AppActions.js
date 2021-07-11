import { fetchData, handleResponse } from '../../services/service';

const getEvents = (queryParams) => {
  let url = '/events';
  if (queryParams) {
    url = url + '?' + new URLSearchParams(queryParams);
  }
  return fetchData({
    url,
  }).then(data => handleResponse(data));
};

const getEventDetail = (id) => {
  return fetchData({
    url: `/events/${id}`,
  }).then(data => handleResponse(data));
};

export {
  getEventDetail,
  getEvents
}
