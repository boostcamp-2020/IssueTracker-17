import React, { useState, useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FilterContext } from "../../index";

const FilterSelectDiv = styled.div`
  padding-top: 16px;
  font-size: 12px;
  color: rgb(88 96 105);
  text-align: left;
  padding-bottom: 8px;
  border-bottom: 1px solid #dddddd;
  position: relative;
  flex: 1;
`;

const FilterPopUpDiv = styled.div`
  display: block;
  ${(props) =>
    !props.popup &&
    css`
      display: none;
    `};
  position: absolute;
  top: 40px;
  right: 0px;
  z-index: 10;
  width: 225%;
  background-color: white;
  border: 1px solid #dddddd;
  border-radius: 3px;
  overflow-x: hidden;
  cursor: pointer;
`;

const ModalOveray = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  display: block;
  ${(props) =>
    !props.popup &&
    css`
      display: none;
    `};
  cursor: default;
  content: ' ';
  background: transparent;
`;

const Caret = styled.div`
  display: inline-block;
  margin-left: 4px;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: '';
  border-top-style: solid;
  border-top-width: 4px;
  border-right: 4px solid transparent;
  border-bottom: 0 solid transparent;
  border-left: 4px solid transparent;
`;

const Title = styled.div`
  cursor: pointer;
`;

const FilterSelect = (props) => {
  const { filterDispatch, filterStore } = useContext(FilterContext);
  const [visible, setVisible] = useState(false);
  const Wrapper = props.list.component;

  const onClickFilterItemEventHandler = ({ id, title }) => {
    if (filterStore[props.list.query]['id'] === id) {
      filterDispatch({ type: 'delete', filter: props.list.query});
    } else {
      filterDispatch({ type: 'update', filter: props.list.query, data: title, id:id });
    }
    setVisible(!visible);
  };

  return (
    <FilterSelectDiv>
      <Title onClick={(e) => {setVisible(!visible)}}>
        {props.list.title}
        <Caret />
      </Title>
      <ModalOveray popup={visible} onClick={(e) => setVisible(!visible)} />
      <FilterPopUpDiv popup={visible} tabIndex={-1}>
        {props.list.list.map((row, idx) => (
          <Wrapper key={idx} row={ row.id === filterStore[props.list.query]['id'] ? {...row,checked:true} : row} Event={onClickFilterItemEventHandler} />
        ))}
      </FilterPopUpDiv>
    </FilterSelectDiv>
  );
};

export { FilterSelect };
