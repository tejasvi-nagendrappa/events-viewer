import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { AppDispatchContext } from '../App';
import { SHOW_EVENT_DETAIL } from '../../utils/AppConstants';
import { formatDateTime } from '../../utils/Helpers';

const propTypes = {
  isModalView: PropTypes.bool,
  isLoading: PropTypes.bool,
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    position: PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      id: PropTypes.number
    }),
    startsAt: PropTypes.string,
    endsAt: PropTypes.string
  })),
};

const defaultProps = {
  isModalView: false,
  isLoading: false,
};

const EventListView = ({ events, isModalView, isLoading }) => {
  const dispatch = useContext(AppDispatchContext);
  const columns = [
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: ({ name }) => {
        return (
          isModalView
            ? name
            : <Button type="link">{name}</Button>
        );
      },
      onCell: (record) => {
        return {
          onClick: () => {
            dispatch({
              type: SHOW_EVENT_DETAIL,
              payload: { eventId: record.id }
            })
          },
        };
      }
    },
    {
      title: 'Starts At',
      dataIndex: 'startsAt',
      key: 'startsAt',
      render: startDateTime => formatDateTime(startDateTime)
    },
    {
      title: 'Ends At',
      dataIndex: 'endsAt',
      key: 'endTime',
      render: endDateTime => formatDateTime(endDateTime),
    },
  ];
  return (
    <Table
      bordered={isModalView}
      columns={columns}
      dataSource={events}
      pagination={false}
      loading={isLoading ? {size: 'large', tip: 'Fetching Events'}: false}
      rowKey={({ id, position}, rowIndex ) =>
        `${id}-${position.id}-${position.name}-${rowIndex}`
      }
    />
  )
}

EventListView.propTypes = propTypes;
EventListView.defaultProps = defaultProps;

export default EventListView;
