import React, { useRef, useContext, useState, useEffect } from 'react';
import { PostsContext } from '../../LabelComponent';
import { LabelViewBox } from './LabelViewBox/LabelViewBox';
import { LabelEditForm } from './LabelEditForm/LabelEditForm';
import styled, { css } from 'styled-components';
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
  const [contents, setContents] = useState(props.data ? props.data.title : '');
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

  function submitLabelFormEventHandler(e) {
    e.preventDefault();
    e.nativeEvent.submitter.classList.contains('cancel-btn')
      ? resetDataEventHandler()
      : clickChangeEventHandler(e);
  }

  function clickChangeEventHandler(e) {
    pushNewLabel({
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
  }

  function resetDataEventHandler() {
    titleRef.current.value = props.data ? props.data.title : '';
    contentsRef.current.value = props.data ? props.data.contents : '';
    setColor(props.data ? props.data.color : randomColor());
    setExTitle(props.data ? props.data.title : 'LabelBox preview');
    key !== -1 ? setFormVisible(!formVisible) : props.toggleHandler(!labelVisible);
  }

  function deleteLabelEventHandler(e) {
    e.preventDefault();
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
