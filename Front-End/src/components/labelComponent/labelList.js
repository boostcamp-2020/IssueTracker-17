import React, { useContext } from 'react';
import { PostsContext } from './index';
import { Label } from './makeLabel';

export function LabelList() {
  const { labelList } = useContext(PostsContext);

  const list = labelList.map((label,idx) => <Label data={label} className={'main'} idx={idx} />);

  return <div className="labelList-form">{list}</div>;
}
