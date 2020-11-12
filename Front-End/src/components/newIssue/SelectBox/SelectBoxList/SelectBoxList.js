import React from 'react';
import styled from 'styled-components';

const List = styled.div``;
const ListEmptyText = styled.div``;

const SelectBoxList = ({ title, rows, WrappedComponent }) => {
  let text = '';
  if (title === 'Assignees') text = 'No one--assign yourself';
  else text = 'None yet';

  if (rows.length > 0) {
    return (
      <List>
        {rows.map((row, index) => (
          <WrappedComponent row={row} key={index}></WrappedComponent>
        ))}
      </List>
    );
  }
  return (
    <List>
      <ListEmptyText>{text}</ListEmptyText>
    </List>
  );
};

export default SelectBoxList;
