import React, { useEffect, useReducer } from 'react';
import { TopLinks } from './LabelMilestoneNewButton/topLink';
import { LabelCounter } from './labelCounter';
import { LabelList } from './labelList';
import * as reducers from '../../reducer';
import './label.css';

export const PostsContext = React.createContext();
const initialState = { list: [] };

function LabelComponent() {
  const [state, dispatch] = useReducer(reducers.labelReducer, initialState);

  function pushNewLabel({ titleRef, contentsRef, colorRef, key, idx, labelWrapper}) {
    if (key === -1) {
      const data = {
        id: 4,
        title: titleRef.current.value,
        contents: contentsRef.current.value,
        color: colorRef.current.value,
      };
      dispatch({ type: 'push', data: data });
      labelWrapper.classList.toggle('hidden');
    } else {
      const data = {
        id: key,
        title: titleRef.current.value,
        contents: contentsRef.current.value,
        color: colorRef.current.value,
      };
      dispatch({ type: 'update', data: data, idx: idx });
      labelWrapper.querySelector('.input-form').classList.toggle('hidden')
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
      <div id="label-form">
        <div id="label-form-wrapper">
          <TopLinks />
          <LabelCounter />
          <LabelList />
        </div>
      </div>
    </PostsContext.Provider>
  );
}

export default LabelComponent;
