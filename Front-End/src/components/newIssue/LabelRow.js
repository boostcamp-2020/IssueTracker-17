import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
  background-color: ${(props) => props.bgc};
  height: 12px;
  padding: 5px 10px;
  font-weight: 600;
  border-radius: 12px;
`;

const LabelRow = ({ row }) => {
  return <Label bgc={row.color}>{row.labelName}</Label>;
};

export default LabelRow;
