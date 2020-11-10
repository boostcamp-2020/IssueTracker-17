import React, { useContext } from 'react';
import { PostsContext } from './LabelComponent';
import { Label } from './makeLabel';

export function LabelList() {
  const { labelList } = useContext(PostsContext);

  const list = labelList.map((label,idx) => <Label key={label.id} data={label} className={'main'} idx={idx} />);

  return <div className="labelList-form">{list}</div>;
}
