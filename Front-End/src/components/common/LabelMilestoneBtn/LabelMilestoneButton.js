import React from 'react';
import styled from 'styled-components';
import { LabelMilestoneButton } from 'Style';
import { LabelSVG } from './LabelSVG';
import { MilestoneSVG } from './MilestoneSVG';
import { Link } from 'react-router-dom';

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
    <Link to="/label">
      <LabelButtonWrapper color={props.color}>
        <LabelSVG color={props.color} />
        <span>Labels</span>
        {props.count ? <span>props.count</span> : ''}
      </LabelButtonWrapper>
    </Link>
  );
}

export function MilestoneButton(props) {
  return (
    <Link to="/milestone">
      <MilestoneButtonWrapper color={props.color}>
        <MilestoneSVG color={props.color} />
        <span>Milestones</span>
        {props.count ? <span>props.count</span> : ''}
      </MilestoneButtonWrapper>
    </Link>
  );
}
