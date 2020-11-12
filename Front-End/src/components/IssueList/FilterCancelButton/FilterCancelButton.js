import React, { useContext } from 'react';
import { CancelSVG } from 'Components/common';
import styled, { css } from 'styled-components';
import { FilterContext } from '../index';

const CanCelButtonWrapper = styled.div`
  color: #586069;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  width: fit-content;
  &:hover {
    color: #0366d6;
    fill: #0366d6;
  }
  ${(props) =>
    !props.close &&
    css`
      display: none;
    `};
`;

export function FilterCancelButton() {
  const { close, filterDispatch, setClose } = useContext(FilterContext);

  const cancelFilterEventHandler = () => {
    filterDispatch({ type: 'deleteAll' });
    setClose(!close);
  };

  return (
    <CanCelButtonWrapper close={close} onClick={(e) => cancelFilterEventHandler(e)}>
      <CancelSVG />
      {'Clear current search query, filters, and sorts'}
    </CanCelButtonWrapper>
  );
}
