/* eslint-disable react/jsx-key */
import React from 'react';
import { MileStoneRow } from './mileStoneRow';
import styled from 'styled-components';

export const MileStoneList = (props) => {
  const datalist = props.mileStoneList;

  const milestonelist = datalist.map((data, idx) => (
    <MileStoneRow
      removeMileStone={props.removeMileStone}
      changeOpenedCnt={props.changeOpenedCnt}
      changeClosedCnt={props.changeClosedCnt}
      key={idx}
      data={data}
    ></MileStoneRow>
  ));

  return milestonelist;
};
