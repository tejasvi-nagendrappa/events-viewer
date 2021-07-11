import React, { useReducer, useEffect, useState } from 'react';
import {
  Layout, message, PageHeader,
} from 'antd';
import EventDetailView from '../EventDetailView';
import EventListView from '../EventListView';
import EventFilter from '../EventFilter';
import {
  MESSAGE_DISPLAY_TIME,
  FETCH_EVENTS_SUCCESS, UPDATE_DATE_RANGE
} from '../../utils/AppConstants';
import ListViewFooter from '../ListViewFooter';
import { getEvents } from './AppActions';
import reducer from './reducer';
import './App.scss';
import { getFormattedErrorMessage } from '../../utils/Helpers';

const { Content } = Layout;

const initialState = {
  eventDetail: {
    showDetails: false,
    eventId: null,
  },
  events: [],
  currentPage: 1,
  pageSize: 10,
  totalItemCount: 10,
  startsAt: null,
  endsAt: null,
};

const AppDispatchContext = React.createContext(null);

const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  const [isEventFetchInProgress, updateEventFetchStatus] = useState(true);
  const {
    events,
    eventDetail: { showDetails, eventId },
    pageSize,
    currentPage,
    startsAt,
    endsAt,
  } = appState;

  const eventsInView = events.length;

  const fetchListOfEvents = async (queryParams, appendEvents = false) => {
    try {
      updateEventFetchStatus(true);
      const eventList = await getEvents(queryParams);
      dispatch({
        type: FETCH_EVENTS_SUCCESS,
        payload: {
          appendEvents,
          data: eventList,
        },
      });
    } catch ({ statusCode }) {
      message.error(
        getFormattedErrorMessage(statusCode),
        MESSAGE_DISPLAY_TIME,
      );
    } finally {
      updateEventFetchStatus(false);
    }
  };

  useEffect(() => {
    let queryParams = {
      limit: pageSize,
    };

    if (startsAt) {
      queryParams = { ...queryParams, startsAt };
    }

    if (endsAt) {
      queryParams = { ...queryParams, endsAt };
    }

    fetchListOfEvents(queryParams);
  }, [startsAt, endsAt, pageSize]);

  const onLoadMoreClick = () => {
    let queryParams = {
      limit: pageSize,
      offset: currentPage,
    };

    if (startsAt) {
      queryParams = { ...queryParams, startsAt };
    }

    if (endsAt) {
      queryParams = { ...queryParams, endsAt };
    }

    fetchListOfEvents(queryParams, true);
  };

  const onFilterClick = (filterParams) => {
    if (
      filterParams.startsAt !== startsAt
      || filterParams.endsAt !== endsAt
      || filterParams.pageSize !== pageSize
    ) {
      dispatch({
        type: UPDATE_DATE_RANGE,
        payload: { data: filterParams },
      });
    } else {
      message.info(
        "Filter criteria has not changed. Try changing it to filter results.",
        MESSAGE_DISPLAY_TIME
      );
    }
  };

  const footerText = `Showing ${eventsInView} Events`;

  return (
    <Layout>
      <PageHeader
        className="App__pageheader"
        title="Event Viewer"
        ghost={false}
        backIcon={false}
      />
      <AppDispatchContext.Provider value={dispatch}>
        <Content>
          {
            showDetails ? <EventDetailView eventId={eventId} /> : null
          }
          <EventFilter
            onFilterClick={onFilterClick}
          />
          <EventListView
            events={events}
            isLoading={isEventFetchInProgress}
          />
          {
            isEventFetchInProgress || eventsInView === 0
              ? null
              : (
                <ListViewFooter
                  footerText={footerText}
                  onLoadMoreClick={onLoadMoreClick}
                />
              )
          }
        </Content>
      </AppDispatchContext.Provider>
    </Layout>
  );
};

export {
  App,
  AppDispatchContext,
};
