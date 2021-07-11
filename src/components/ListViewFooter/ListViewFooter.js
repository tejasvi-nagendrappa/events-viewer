import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'antd';
import './ListViewFooter.scss'

const propTypes = {
  onLoadMoreClick: PropTypes.func,
  isLastPage: PropTypes.bool,
  footerText: PropTypes.string,
};

const ListViewFooter = ({
  onLoadMoreClick, isLastPage, footerText
}) => (
  <div className="ListViewFooter">
    <Button
      shape="round"
      type="primary"
      onClick={onLoadMoreClick}
      disabled={isLastPage}
    >
      Load More
    </Button>
    <div className="ListViewFooter__textwrapper">
      <Typography.Text strong>{footerText}</Typography.Text>
    </div>
  </div>
);

ListViewFooter.propTypes = propTypes;
export default ListViewFooter;
