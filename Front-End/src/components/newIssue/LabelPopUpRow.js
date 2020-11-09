import React from 'react';
import styled from 'styled-components';

const LabelRow = styled.div`
  padding: 5px 0;
  padding-left: 20px;
  border-bottom: 1px solid #dddddd;
`;
const LabelRowHead = styled.div`
  height: 20px;
  display: flex;
  justify-content: left;
  vertical-align: center;
`;
const LabelName = styled.div`
  padding-left: 10px;
`;
const LabelColor = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.labelColor};
  border-radius: 3px;
`;
const LabelDescription = styled.div`
  font-size: 11px;
`;

const LabelPopUpRow = ({ row }) => {
  return (
    <LabelRow>
      <LabelRowHead>
        <LabelColor labelColor={row.color} />
        <LabelName>{row.labelName}</LabelName>
      </LabelRowHead>
      <LabelDescription>{row.description}</LabelDescription>
    </LabelRow>
  );
};

export default LabelPopUpRow;
