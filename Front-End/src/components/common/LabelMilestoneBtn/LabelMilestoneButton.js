import React from 'react';
import styled from 'styled-components';
import { LabelMilestoneButton } from 'Style';
import { LabelSVG } from './LabelSVG';
import { MilestoneSVG } from './MilestoneSVG';

const LabelButtonWrapper = styled(LabelMilestoneButton)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const MilestoneButtonWrapper = styled(LabelMilestoneButton)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

export function LabelButton(props) {
  return (
    <LabelButtonWrapper>
      <LabelSVG />
      <span>Labels</span>
      {props.count ? <span>props.count</span> : ''}
    </LabelButtonWrapper>
  );
}

export function MilestoneButton(props) {
  return (
    <MilestoneButtonWrapper>
      <MilestoneSVG />
      <span>Milestones</span>
      {props.count ? <span>props.count</span> : ''}
    </MilestoneButtonWrapper>
  );
}
