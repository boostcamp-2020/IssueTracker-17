import React, { useContext } from 'react';
import { LabelEditInput } from '../LabelEditInput/LabelEditInput';
import { RefreshSVG } from './RefreshSVG';
import styled from 'styled-components';
import { LabelContext } from '../../LabelBox';

const RefreshButton = styled.div`
  border: none;
  width: 30px;
  height: 25px;
  margin-right: 9px;
  background-color: #0366d6;
  text-align: center;
`;

const ColorTextWrapper = styled.div`
  display: flex;
`;

export function ColorInput() {
  const { color, colorRef, setColor, onClickRefreshButton } = useContext( LabelContext );

  function onChangeColor(e){
    setColor(e.target.value);
  }

  return (
    <ColorTextWrapper>
      <RefreshButton className="refresh-button" onClick={(e) => onClickRefreshButton(e)}>
        <RefreshSVG />
      </RefreshButton>
      <LabelEditInput value={color} Ref={colorRef} onChangeHandler={onChangeColor} />
    </ColorTextWrapper>
  );
}
