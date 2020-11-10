import React, { useContext } from 'react';
import { PostsContext } from '../LabelComponent';
import { Label } from './LabelBox/LabelBox';
import { LabelNavBar } from './LabelNavBar/LabelNavBar';
import styled from 'styled-components';

const LabelListForm = styled.div`
  display: block;
`;

export function LabelList() {
  const { labelList } = useContext(PostsContext);

  const list = labelList.map((label, idx) => (
    <Label key={label.id} data={label} className={'main'} idx={idx} />
  ));

  return (
    <LabelListForm>
      <LabelNavBar />
      {list}
    </LabelListForm>
  );
}
