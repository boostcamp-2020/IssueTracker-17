import React from 'react';
import { LabelEditDeleteButtons } from './LabelEditDeleteButtons/LabelEditDeleteButtons';
import { LabelViewText } from './LabelViewText/LabelViewText';
import { LabelViewContents } from './LabelViewContents/LabelViewContents';
import styled from 'styled-components';

const LabelViewBoxWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 15px;
`;

export function LabelViewBox() {
  return (
    <LabelViewBoxWrapper>
      <LabelViewText />
      <LabelViewContents />
      <LabelEditDeleteButtons />
    </LabelViewBoxWrapper>
  );
}
