import {
  FETCH_EVENTS_SUCCESS,
  SHOW_EVENT_DETAIL,
  HIDE_EVENT_DETAIL,
  UPDATE_DATE_RANGE,
} from "../../utils/AppConstants";

const addEventsToState = (state, payload) => {
  const {
    data: {
      items = [],
      pagination: {
        offset, count
      },
    },
    appendEvents
  } = payload;
  const { events } = state;
  return {
    ...state,
    events: appendEvents ? [...events, ...items] : items,
    currentPage: offset + 1,
    totalItemCount: count
  };
}

const showEventDetail = (state, payload) => {
  const { eventId } = payload;
  return {
    ...state,
    eventDetail: {
      eventId,
      showDetails: true
    },
  };
}

const hideEventDetail = (state) => {
  return {
    ...state,
    eventDetail: {
      showDetails: false
    },
  };
};

const updateDateRange = (state, payload) => {
  const { data } = payload;
  return {
    ...state,
    ...data,
  };
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case FETCH_EVENTS_SUCCESS:
      return addEventsToState(state, payload);
    case SHOW_EVENT_DETAIL:
      return showEventDetail(state, payload);
    case HIDE_EVENT_DETAIL:
      return hideEventDetail(state);
    case UPDATE_DATE_RANGE:
      return updateDateRange(state, payload);
    default:
      return state;
  }
};

export default reducer;
