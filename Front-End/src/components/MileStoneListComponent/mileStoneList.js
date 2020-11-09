/* eslint-disable react/jsx-key */
import React from 'react';
import { MileStoneRow } from './mileStoneRow';
import styled from 'styled-components';
import axios from 'axios';

const getMileStoneList = () => {
  const apiUrl = 'http://localhost:3000/milestone/';
  axios
    .get(apiUrl)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      alert(err);
    });
};

export const MileStoneList = () => {
  const data = {
    title: '스프린트',
    contents: '내용',
    until: new Date().toLocaleString(),
  };

  const datalist = [];
  for (let i = 0; i < 10; i++) {
    const newdata = Object.assign({}, data);
    newdata.title += ' ' + i;
    newdata.contents += ' ' + i;
    datalist.push(newdata);
  }

  const milestonelist = datalist.map((data, idx) => (
    <MileStoneRow key={idx} data={data}></MileStoneRow>
  ));
  getMileStoneList();
  return milestonelist;
};
