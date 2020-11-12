import React from 'react';
import styled from 'styled-components';

const List = styled.div``;
const ListEmptyText = styled.div``;

const SelectBoxList = ({ category, rows, RowComponent }) => {
  let emptyText = '';
  if (category == 'Assignees') emptyText = 'No one--assign yourself';
  else emptyText = 'None yet';

  if (rows.length > 0) {
    return (
      <List>
        {rows.map((row, index) => (
          <RowComponent row={row} key={index}></RowComponent>
        ))}
      </List>
    );
  }
  return (
    <List>
      <ListEmptyText>{emptyText}</ListEmptyText>
    </List>
  );
};

export default SelectBoxList;
