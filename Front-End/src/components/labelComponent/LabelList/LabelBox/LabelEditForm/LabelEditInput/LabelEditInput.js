import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  height: 19px;
`;

export function LabelEditInput(props) {
  return <Input type="text" value={props.value} ref={props.Ref} onChange={(e) => props.onChangeHandler(e)} />;
}