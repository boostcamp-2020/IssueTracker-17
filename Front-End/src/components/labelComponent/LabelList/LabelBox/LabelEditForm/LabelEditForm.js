import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { LabelEditInput } from './LabelEditInput/LabelEditInput';
import { ColorInput } from './ColorInput/ColorInput';
import { LabelFormButtons } from './LabelFormButtons/LabelFormButtons';
import { LabelContext } from '../LabelBox';

const Form = styled.form`
  ${(props) =>
    !props.visible &&
    css`
      display: none;
    `};
  margin: 0px 13px;
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const InputDiv = styled.div`
  flex: 1;
`;

export function LabelEditForm(props) {
  const { setTitle, setExTitle, title, titleRef, contents, contentsRef, setContents, formVisible, submitLabelFormEventHandler } = useContext(LabelContext);
  function onChangeTitle(e) {
    setTitle(e.target.value);
    e.target.value === ''
      ? setExTitle('LabelBox preview')
      : setExTitle(e.target.value);
  }

  function onChangeContents(e){
    setContents(e.target.value);
  }

  return (
    <Form onSubmit={(e) => submitLabelFormEventHandler(e) } visible={formVisible}>
      <InputWrapper className={'input-wrapper'}>
        <InputDiv>
          <div>Label name</div>
          <LabelEditInput value={title} Ref={titleRef} onChangeHandler={onChangeTitle} />
        </InputDiv>
        <InputDiv>
          <div>Description</div>
          <LabelEditInput value={contents} Ref={contentsRef} onChangeHandler={onChangeContents} />
        </InputDiv>
        <InputDiv>
          <div>Color</div>
          <ColorInput />
        </InputDiv>
        <LabelFormButtons />
      </InputWrapper>
    </Form>
  );
}
