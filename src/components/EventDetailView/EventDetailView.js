import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button, Space, Skeleton, message, Typography
} from 'antd';
import EventListView from '../EventListView';
import { getEventDetail } from '../App/AppActions';
import EmployeeList from '../EmployeeList';
import { AppDispatchContext } from '../App';
import { HIDE_EVENT_DETAIL } from '../../utils/AppConstants';
import MessageList from '../MessageList';

const propTypes = {
  eventId: PropTypes.number.isRequired,
};

const initialState = {
  hasError: false,
  loading: true,
  eventDetails: {
    id: null,
    position: {},
    employees: []
  }
};

const EventDetailView = ({ eventId }) => {
  const [state, updateState] = useState(initialState);
  const dispatch = useContext(AppDispatchContext)

  const { loading, eventDetails, hasError } = state;

  const fetchEventDetail = async (id) => {
    try {
      const detailsData = await getEventDetail(id);
      updateState({
        hasError: false,
        loading: false,
        eventDetails: detailsData,
      });
    } catch ({ statusCode }) {
      message.error(
        <MessageList statusCode={statusCode} />,
        5
      );
      updateState({
        hasError: true,
        loading: false,
        eventDetails: initialState.eventDetails,
      });
    }
  };

  useEffect(() => {
    fetchEventDetail(eventId);
  }, [eventId]);;

  const onModalClose = () => {
    dispatch({
      type: HIDE_EVENT_DETAIL,
    });
  };

  return (
    <Modal
      visible
      title="Event Detail View"
      centered
      onCancel={onModalClose}
      footer={[
        <Button
          key="close"
          shape="round"
          type="primary"
          onClick={onModalClose}
        >
          Close
        </Button>
      ]}
    >
      {loading
        ? <Skeleton />
        : (
          <>
            <Space
              direction="vertical"
              size="large"
            />
            {
              !hasError &&
              <EventListView
                isModalView
                events={[eventDetails]}
              />
            }
            <Space
              direction="vertical"
              size="large"
            />
            <Space
              direction="vertical"
              size="large"
            />
            {
              !hasError &&
              <EmployeeList
                listOfEmployees={eventDetails.employees}
                loading={loading}
              />
            }
            {
              hasError &&
              <Typography.Text type="danger">
                Error occur while fetching Event Details.
              </Typography.Text>
            }
          </>
        )
      }
    </Modal>
  );
}

EventDetailView.propTypes = propTypes;
export default EventDetailView;
