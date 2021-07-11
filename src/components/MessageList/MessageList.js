import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { ERROR_CODES_TEXT  } from '../../utils/AppConstants';

const propTypes = {
  statusCode: PropTypes.number,
};

const MessageList = ({ statusCode }) => {
  const statusCodeReasons = ERROR_CODES_TEXT[statusCode] || [];
  const genericErrorMsg = statusCodeReasons.length === 0
    ? 'Error occured while connecting to server.'
    : 'Error occured. This might be because of ';
  const genericErrorNode = (
    <Typography.Text key="generic">
      {genericErrorMsg}
    </Typography.Text>
  );
  const reasonsNode = statusCodeReasons.map((text) => {
    return (
      <Typography.Text key={`message-${text}`}>
        {` ${text} `}
      </Typography.Text>
    );
  });

  return [genericErrorNode, reasonsNode];
};

MessageList.propTypes = propTypes;
export default MessageList;
