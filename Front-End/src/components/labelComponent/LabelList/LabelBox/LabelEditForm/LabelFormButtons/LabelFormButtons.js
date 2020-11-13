import React, { useContext } from 'react';
import { LabelContext } from '../../LabelBox';
import styled from 'styled-components';
import { GreenButton, GrayButton } from 'Style';

const LabelFormButtonsDiv = styled.div`
  align-self: flex-end;
  flex: 1.1 !important;
  text-align: right;
`;

export function LabelFormButtons() {
  const { title, key } = useContext(LabelContext);
  return (
    <LabelFormButtonsDiv>
      {/* onClick={(e) => resetDataEventHandler(e)}*/}
      <GrayButton className="cancel-btn">Cancel</GrayButton>
      <GreenButton
        // onClick={(e) => clickChangeEventHandler(e)}
        className="create-btn"
        disabled={!title}
      >
        {key !== -1 ? 'Save Changes' : 'Create label'}
      </GreenButton>
    </LabelFormButtonsDiv>
  );
}
