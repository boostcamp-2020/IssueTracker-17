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
const CountArea = styled.span`
  min-width: 20px;
  padding: 0 6px;
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 2em;
  background-color: rgba(209, 213, 218, 0.4);
`;

export function LabelButton(props) {
  return (
    <Link to="/label">
      <LabelButtonWrapper color={props.color}>
        <LabelSVG color={props.color} />
        <span>Labels</span>
        {props.count ? <CountArea>{props.count}</CountArea> : ''}
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
        {props.count ? <CountArea>{props.count}</CountArea> : ''}
      </MilestoneButtonWrapper>
    </Link>
  );
}
