import React, { useEffect, useReducer } from 'react';
import { LabelMilestoneNewButton } from './LabelMilestoneNewButton/LabelMilestoneNewButton';
import { LabelList } from './LabelList/LabelList';
import * as reducers from '../../reducer';
import styled from 'styled-components';
import { getLabelList, createLabelList, updateLabelList } from 'Api/labelTranscation';

const Wrapper = styled.div`
  width: 85%;
  margin: auto;
`;

export const PostsContext = React.createContext();
const initialState = { list: [] };

export function LabelComponent() {
  const [state, dispatch] = useReducer(reducers.labelReducer, initialState);

  async function pushNewLabel({ titleRef, contentsRef, colorRef, key, idx }) {
    if (key === -1) {
      const data = {
        title: titleRef.current.value,
        contents: contentsRef.current.value,
        color: colorRef.current.value,
      };
      const result = await createLabelList(data);
      data['id'] = result['id'];
      dispatch({ type: 'push', data: data });
    } else {
      const data = {
        id: key,
        title: titleRef.current.value,
        contents: contentsRef.current.value,
        color: colorRef.current.value,
      };
      await updateLabelList(data);
      dispatch({ type: 'update', data: data, idx: idx });
    }
  }

  useEffect(async () => {
    const initData = await getLabelList();
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
