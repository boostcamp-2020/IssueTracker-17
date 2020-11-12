import React, { useEffect, useState } from 'react';
import { MileStoneList } from './mileStoneList';
import styled, { createGlobalStyle } from 'styled-components';
import { getMileStoneList } from '../../api/milestoneTransaction';
import { LabelButton, MilestoneButton } from 'Components/common/';
import { GreenButton, GrayButton } from 'Style';
import { Link } from 'react-router-dom';
import { OpenIssueSVG } from './svg/OpenIssueSVG';
import { ClosedIssueSVG } from './svg/ClosedIssueSVG';
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
  width: 1024px;
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
const MenuHeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const LabelMilestoneBtnArea = styled.div``;
const MileStoneListComponent = () => {
  const [mileStoneList, setMilestonelist] = useState([]);
  const [openedCnt, setOpenedCnt] = useState(0);
  const [closedCnt, setClosedCnt] = useState(0);
  useEffect(async () => {
    let opened = 0;
    let closed = 0;
    const res = await getMileStoneList();
    res.forEach((milestone) => {
      milestone.status === 0 ? (opened += 1) : (closed += 1);
    });

    setMilestonelist(res);
    setClosedCnt(closed);
    setOpenedCnt(opened);
  }, []);

  const removeMileStone = (targetId) => {
    let opened = 0;
    let closed = 0;
    const filteredList = mileStoneList.filter((milestone) => {
      const res = milestone.id !== targetId;
      res && milestone.status === 0 ? (opened += 1) : (closed += 1);
      return res;
    });
    setMilestonelist(filteredList);
    setClosedCnt(closed);
    setOpenedCnt(opened);
  };

  const changeOpenedCnt = (amount) => {
    setOpenedCnt(openedCnt + amount);
  };
  const changeClosedCnt = (amount) => {
    setClosedCnt(closedCnt + amount);
  };

  return (
    <MileStoneContainer>
      <GlobalStyle />
      <MenuHeaderArea>
        <LabelMilestoneBtnArea>
          <LabelButton />
          <MilestoneButton color="#0366d6" />
        </LabelMilestoneBtnArea>
        <Link to="/milestone/new">
          <GreenButton>New Milestone</GreenButton>
        </Link>
      </MenuHeaderArea>
      <ListHeader>
        <div>
          <OpenIssueSVG></OpenIssueSVG> open :{openedCnt}
        </div>

        <div>
          <ClosedIssueSVG></ClosedIssueSVG>closed : {closedCnt}
        </div>
      </ListHeader>
      <ListContainer>
        <MileStoneList
          removeMileStone={removeMileStone}
          changeOpenedCnt={changeOpenedCnt}
          changeClosedCnt={changeClosedCnt}
          mileStoneList={mileStoneList}
        ></MileStoneList>
      </ListContainer>
    </MileStoneContainer>
  );
};

export default MileStoneListComponent;
