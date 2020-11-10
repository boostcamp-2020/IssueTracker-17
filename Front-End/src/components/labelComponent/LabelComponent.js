import React, { useEffect, useReducer } from 'react';
import { LabelMilestoneNewButton } from './LabelMilestoneNewButton/LabelMilestoneNewButton';
import { LabelList } from './LabelList/LabelList';
import * as reducers from '../../reducer';
import styled from 'styled-components';
import './label.css';

const Wrapper = styled.div`
  width: 85%;
  margin: auto;
`;

export const PostsContext = React.createContext();
const initialState = { list: [] };

function LabelComponent() {
  const [state, dispatch] = useReducer(reducers.labelReducer, initialState);

  function pushNewLabel({ titleRef, contentsRef, colorRef, key, idx}) {
    if (key === -1) {
      const data = {
        id: 4,
        title: titleRef.current.value,
        contents: contentsRef.current.value,
        color: colorRef.current.value,
      };
      dispatch({ type: 'push', data: data });
    } else {
      const data = {
        id: key,
        title: titleRef.current.value,
        contents: contentsRef.current.value,
        color: colorRef.current.value,
      };
      dispatch({ type: 'update', data: data, idx: idx });
    }
  }

  useEffect(() => {
    const initData = [
      { id: 1, title: 'first', contents: '하하', color: '#012345' },
    ];
    initData.forEach((data) => {
      dispatch({ type: 'push', data: data });
    });
  }, []);

  let labelList = state.list;

  return (
    <PostsContext.Provider value={{ labelList, dispatch, pushNewLabel }}>
      <div>
        <Wrapper>
          <LabelMilestoneNewButton />
          <LabelList />
        </Wrapper>
      </div>
    </PostsContext.Provider>
  );
}

export default LabelComponent;
