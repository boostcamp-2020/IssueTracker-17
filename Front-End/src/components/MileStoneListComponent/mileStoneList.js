/* eslint-disable react/jsx-key */
import React from 'react';
import { MileStoneRow } from './mileStoneRow';
import styled from 'styled-components';

export const MileStoneList = (props) => {
  /*
  const data = {
    title: '스프린트',
    contents: '내용',
    until: new Date().toLocaleString(),
  };
*/
  const datalist = props.mileStoneList;
  // console.log(datalist);

  const milestonelist = datalist.map((data, idx) => (
    <MileStoneRow key={idx} data={data}></MileStoneRow>
  ));

  return milestonelist;
};
