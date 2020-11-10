/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';

const FilterBar = styled.div`
  //border: 1px solid rgb(225 228 232);
  height: 40px;
  width: 100%;
  padding: 5px;
  display: flex;
  background-color: #f4f4f4;
`;
const FilterSelector = styled.select`
  border: 1px solid rgb(225 228 232);
  width: 50px;
  background-color: #f4f4f4;
`;
const SearchInputBox = styled.div`
  border: 1px solid rgb(225 228 232);
  background-color: #f4f4f4;
  width: 100% !important;
`;

export const FilterBarComponent = (props) => {
  return (
    <FilterBar>
      <FilterSelector value="1">
        <option value="1">Filters</option>
      </FilterSelector>

      <SearchInputBox>search all issues</SearchInputBox>
    </FilterBar>
  );
};
