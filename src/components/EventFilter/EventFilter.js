import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, DatePicker, Button, Space } from 'antd';
import './EventFilter.scss';

const propTypes = {
  onFilterClick: PropTypes.func
};

const initialState = {
  startsAt: null,
  endsAt: null,
  pageSize: 10
};

const { RangePicker } = DatePicker;

const EventFilter = ({ onFilterClick }) => {
  const [filterState, updateFilter] = useState(initialState);
  const { pageSize } = filterState;

  const onRangeChange = (dateRanges) => {
    let startAsIso = null;
    let endAsIso = null;

    if (dateRanges && dateRanges.length === 2) {
      const [start, end] = dateRanges;
      startAsIso = start.toISOString();
      endAsIso = end.toISOString();
    }

    updateFilter({
      ...filterState,
      startsAt: startAsIso,
      endsAt: endAsIso
    });
  };

  const onPageSizeChange = (size) => {
    if (size) {
      updateFilter({
        ...filterState,
        pageSize: size,
      });
    }
  };

  const onFilterBtnClick = () => {
    onFilterClick(filterState);
  };

  return (
    <div className="EventFilter">
      <Space direction="horizontal" size="large">
      <div>
        <Space direction="horizontal" size="middle">
          <label>Date Range</label>
          <RangePicker
            onChange={onRangeChange}
            showTime={{ use12Hours: true }}
          />
        </Space>
      </div>
      <div>
        <Space direction="horizontal" size="middle">
          <label>Page Size</label>
          <InputNumber
            keyboard={false}
            min={1}
            value={pageSize}
            onChange={onPageSizeChange}
          />
        </Space>
      </div>
      <div>
        <Button
          type="primary"
          shape="round"
          onClick={onFilterBtnClick}
        >
          Filter Events
        </Button>
        </div>
      </Space>
    </div>
  )
};

EventFilter.propTypes = propTypes;
export default EventFilter;
