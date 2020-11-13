import React, { useContext } from 'react';
import { LabelContext } from '../../LabelBox';
import styled from 'styled-components';

const TextWrapper = styled.div`
  margin-left: 1.5%;
  flex: 1;
`;

const TextDiv = styled.div`
  width: fit-content;
  padding: 3px 10px;
  border-radius: 7px;
`;

export function LabelViewText() {
  const { exTitle, color } = useContext(LabelContext);

  return (
    <TextWrapper>
      <TextDiv className="extitle" style={{ backgroundColor: color }}>
        {exTitle}
      </TextDiv>
    </TextWrapper>
  );
}
