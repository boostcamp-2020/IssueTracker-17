import React, { useContext } from 'react';
import { PostsContext } from '../../LabelComponent';
import { NavBar } from 'Style';
import styled from 'styled-components';

const NavText = styled.div`
  margin-left: 5px;
`;

export function LabelNavBar() {
  const { labelList } = useContext(PostsContext);

  return (
    <NavBar>
      <NavText>{labelList.length}</NavText>
      <NavText> labels</NavText>
    </NavBar>
  );
}
