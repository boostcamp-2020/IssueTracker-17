import React, { useEffect, useState } from 'react';
import { MileStoneList } from './mileStoneList';
import styled, { createGlobalStyle } from 'styled-components';
import { TopLinks } from './topLink';
import axios from 'axios';

const getMileStoneList = () => {
  const apiUrl = 'http://localhost:3000/milestone/';
  return axios
    .get(apiUrl)
    .then((result) => {
      return result.data.result;
    })
    .catch((err) => {
      alert(err);
      return [];
    });
};
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
    font-family: Helvetica, Arial, sans-serif;
  }
  #app {
    width: 100%;
    height: 100%;
  }
`;

const MileStoneContainer = styled.div`
  width: 85%;
  margin: auto;
`;

const ListHeader = styled.div`
  display: flex;
  border: 1px solid rgb(225 228 232);
  border-bottom: none;
  height: 40px;
  padding: 5px;
  align-items: center;
  background-color: #f4f4f4;
`;
const ListContainer = styled.div`
  border: 1px solid rgb(225 228 232);
`;

const MileStoneListComponent = () => {
  const [mileStoneList, setMilestonelist] = useState([]);
  let opened = 0;
  let closed = 0;

  useEffect(() => {
    getMileStoneList().then((res) => {
      setMilestonelist(res);
    });
  }, []);

  console.log(mileStoneList);
  mileStoneList.forEach((milestone) => {
    milestone.status === 0 ? (opened += 1) : (closed += 1);
  });
  return (
    <MileStoneContainer>
      <GlobalStyle />
      <TopLinks></TopLinks>
      <ListHeader>
        <div>
          <svg
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 11-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm0 8.5h4.384a.25.25 0 00.161-.06l2.07-1.75a.25.25 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h5z"
            ></path>
          </svg>
          open :{opened}
        </div>

        <div>
          <svg
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
            ></path>
          </svg>
          closed : {closed}
        </div>
      </ListHeader>
      <ListContainer>
        <MileStoneList mileStoneList={mileStoneList}></MileStoneList>
      </ListContainer>
    </MileStoneContainer>
  );
};

export default MileStoneListComponent;
