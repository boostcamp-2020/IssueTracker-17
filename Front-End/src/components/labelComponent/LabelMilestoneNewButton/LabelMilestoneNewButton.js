import React, { useState } from 'react';
import { Label } from '../LabelList/LabelBox/LabelBox';
import { LabelButton, MilestoneButton } from 'Components/common';
import { GreenButton } from 'Style';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 16%;
  margin-right: auto;
  display: flex;
`;

const ButtonsWrapper = styled.div`
  margin: 20px 0px;
  display: flex;
`;

const ButtonsForm = styled.div`
  margin-bottom: 20px;
`;

export function LabelMilestoneNewButton() {
  const [labelVisible, setLabelVisible] = useState(false);
  function toggleLabelInputEventHandler() {
    setLabelVisible(!labelVisible);
  }

  return (
    <ButtonsForm>
      <ButtonsWrapper>
        <Wrapper>
          <LabelButton />
          <MilestoneButton />
        </Wrapper>
        <GreenButton onClick={(e) => toggleLabelInputEventHandler()}>
          New Label
        </GreenButton>
      </ButtonsWrapper>
      <Label className={'top-input'} flag={1} labelVisible={labelVisible} toggleHandler={setLabelVisible} />
    </ButtonsForm>
  );
}
