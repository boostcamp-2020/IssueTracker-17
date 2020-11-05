import React, { useContext } from 'react';
import { PostsContext } from './index';

export function LabelCounter() {
  const { labelList } = useContext(PostsContext);

  return (
    <div className="label-counter">
      <div>{labelList.length}</div>
      <div> labels</div>
    </div>
  );
}
