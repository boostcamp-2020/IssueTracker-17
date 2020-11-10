import React, { useContext } from 'react';
import { LabelContext } from '../../LabelBox';
import styled from 'styled-components';

const ContentDiv = styled.div`
  margin-left: 5.5% !important;
  flex: 1;
`;

export function LabelViewContents() {
  const { contents } = useContext(LabelContext);
  return (
    <ContentDiv>{contents}</ContentDiv>
  );
}
