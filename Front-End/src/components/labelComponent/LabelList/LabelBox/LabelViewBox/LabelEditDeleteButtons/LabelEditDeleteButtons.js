import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { LabelContext } from '../../LabelBox';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  ${(props) =>
    props.visible === -1 &&
    css`
      display: none;
    `};
  flex: 3 !important;
  text-align: right;
  margin-right: 13px;
`;

const Buttons = styled.div`
  border: transparent;
  background-color: transparent;
  font-size: 15px;
`;

const EditButton = styled(Buttons)`
  margin-right: 15px;
`;

export function LabelEditDeleteButtons(props) {
  const { key, toggleLabelDetailEventHandler, deleteLabelEventHandler } = useContext(LabelContext);
  return (
    //   className={'label-contents-btn' + (props.flag ? ' hidden' : '')}
    <Wrapper visible={key}>
      <EditButton className='label-edit-btn' onClick={(e) => toggleLabelDetailEventHandler(e)}>
        Edit
      </EditButton>
      <Buttons className='label-delete-btn' onClick={(e) => deleteLabelEventHandler(e)}>
        Delete
      </Buttons>
    </Wrapper>
  );
}
