import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List, Typography } from 'antd';

const propTypes = {
  listOfEmployees: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      id: PropTypes.number,
      image: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
};

const EmployeeList = ({
  listOfEmployees,
}) => {
  return (
    <List
      header={
        <Typography.Title level={5}>
          List of Employees
        </Typography.Title>
      }
      itemLayout="horizontal"
      dataSource={listOfEmployees}
      rowKey={record => record.id}
      renderItem={({
        firstName, lastName, image, id,
      }) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={image} />}
            title={`${firstName} ${lastName}`}
            description={`Employee Id : ${id}`}
          />
        </List.Item>
      )}
    />
  );
};

EmployeeList.propTypes = propTypes;
export default EmployeeList;
