import React, { useRef, useContext, useState, useEffect } from 'react';
import { PostsContext } from '../../LabelComponent';
import { LabelViewBox } from './LabelViewBox/LabelViewBox';
import { LabelEditForm } from './LabelEditForm/LabelEditForm';
import styled, { css } from 'styled-components';
import { deleteLabelList } from 'Api/labelTransaction';

export const LabelContext = React.createContext();

const LabelBoxWrapper = styled.div`
  ${(props) =>
    !props.visible &&
    css`
      display: none;
    `};
  border: 1px solid gray;
`;

export function Label(props) {
  const { pushNewLabel, dispatch } = useContext(PostsContext);
  const [title, setTitle] = useState(props.data ? props.data.title : '');
  const [contents, setContents] = useState(
    props.data ? props.data.contents : ''
  );
  const [color, setColor] = useState(
    props.data ? props.data.color : randomColor()
  );
  const [exTitle, setExTitle] = useState(
    props.data ? props.data.title : 'LabelBox preview'
  );
  const [labelVisible, setLabelVisible] = useState(
    props.data ? true : props.labelVisible
  );
  const [formVisible, setFormVisible] = useState(!props.data);
  const [editVisible, setEditVisible] = useState(true);
  const titleRef = useRef({ title });
  const contentsRef = useRef({ contents });
  const colorRef = useRef({ color });
  const key = props.data ? props.data.id : -1;
  const idx = props.data ? props.idx : -1;

  useEffect(() => {
    props.labelVisible !== undefined
      ? setLabelVisible(props.labelVisible)
      : undefined;
  }, [props.labelVisible]);

  function onClickRefreshButton(e) {
    e.preventDefault();
    setColor(randomColor());
  }

  function randomColor() {
    let text = '';
    const possible = 'ABCDEF0123456789';
    Array.from(Array(6)).forEach(() => {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    });
    return '#' + text;
  }

  async function submitLabelFormEventHandler(e) {
    e.preventDefault();
    e.nativeEvent.submitter.classList.contains('cancel-btn')
      ? resetDataEventHandler()
      : await clickChangeEventHandler(e);
  }

  async function clickChangeEventHandler(e) {
    await pushNewLabel({
      titleRef,
      contentsRef,
      colorRef,
      key,
      idx,
    });
    key === -1 ? resetDataEventHandler() : setFormVisible(!formVisible);
  }

  function toggleLabelDetailEventHandler(e) {
    setFormVisible(!formVisible);
    setEditVisible(!editVisible);
  }

  function resetDataEventHandler() {
    setTitle(props.data ? props.data.title : '');
    setContents(props.data ? props.data.contents : '');
    setColor(props.data ? props.data.color : randomColor());
    setExTitle(props.data ? props.data.title : 'LabelBox preview');
    key !== -1
      ? setFormVisible(!formVisible)
      : props.toggleHandler(!labelVisible);
    setEditVisible(!editVisible);
  }

  async function deleteLabelEventHandler(e) {
    e.preventDefault();
    await deleteLabelList({ id: key });
    dispatch({ type: 'delete', idx: props.idx });
  }

  return (
    <LabelContext.Provider
      value={{
        title,
        setTitle,
        contents,
        setContents,
        color,
        key,
        setColor,
        exTitle,
        setExTitle,
        titleRef,
        contentsRef,
        colorRef,
        labelVisible,
        formVisible,
        setLabelVisible,
        setFormVisible,
        editVisible,
        deleteLabelEventHandler,
        submitLabelFormEventHandler,
        toggleLabelDetailEventHandler,
        onClickRefreshButton,
      }}
    >
      <LabelBoxWrapper visible={labelVisible}>
        <LabelViewBox />
        <LabelEditForm />
      </LabelBoxWrapper>
    </LabelContext.Provider>
  );
}
