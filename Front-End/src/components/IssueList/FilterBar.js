/* eslint-disable react/jsx-key */
import React from 'react';
import styled from 'styled-components';

const FilterBar = styled.div`
  //border: 1px solid rgb(225 228 232);
  height: 40px;
  display: flex;
  border-radius: 2px;
`;
const FilterSelector = styled.select`
  border: 1px solid rgb(225 228 232);
  width: 100px;
  background-color: #f4f4f4;
`;

const InputForm = styled.input`
  padding: 5px 12px;
  margin: 2px;
  font-size: 14px;
  line-height: 20px;
  width: 450px;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
`;

export const FilterBarComponent = (props) => {
  return (
    <FilterBar>
      <FilterSelector value="1">
        <option value="1">Filters</option>
      </FilterSelector>

      <InputForm placeholder="search all issues"></InputForm>
    </FilterBar>
  );
};
