import React, { useRef, useContext, useState } from 'react';
import { PostsContext } from './index';

export function Label(props) {
  const { pushNewLabel, dispatch } = useContext(PostsContext);
  const titleRef = useRef({ value: props.data ? props.data.title : ''});
  const contentsRef = useRef({ value : props.data ? props.data.contents : ''});
  const colorRef = useRef({ value :props.data ? props.data.color : ''});
  const [color, setColor] = useState(props.data ? props.data.color : randomColor());
  const [exTitle, setExTitle] = useState(props.data ? props.data.title : 'Label preview');

  function randomColor() {
    let text = '';
    const possible = 'ABCDEF0123456789';
    Array.from(Array(6)).forEach(() => {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    });
    console.log('text : ',text);
    return '#' + text;
  }

  function clickChangeEventHandler(e) {
    e.preventDefault();
    if (!e.target.classList.contains('create-btn')) return;
    const key = props.data ? props.data.id : -1;
    const labelWrapper = e.target.closest('.label-wrapper');
    pushNewLabel({ titleRef, contentsRef, colorRef, key, idx: props.idx, labelWrapper });
  }

  function toggleLabelDetailEventHandler(e) {
    const detailForm = e.target
      .closest('.label-wrapper')
      .querySelector('.input-form');
    detailForm.classList.toggle('hidden');
  }

  function resetDataEventHandler(e) {
    e.preventDefault();
    titleRef.current.value = props.data ? props.data.title : '';
    contentsRef.current.value = props.data ? props.data.contents : '';
    setColor(props.data ? props.data.color : randomColor());
    setExTitle(props.data ? props.data.title : 'Label preview');
    const labelWrapper = e.target.closest('.label-wrapper');
    props.data
      ? labelWrapper.querySelector('.input-form').classList.toggle('hidden')
      : labelWrapper.classList.toggle('hidden');
  }

  function deleteLabelEventHandler(e) {
    e.preventDefault();
    dispatch({ type: 'delete', idx: props.idx});
  }

  return (
    <div
      className={ props.className + '-wrapper label-wrapper' + (props.flag ? ' hidden' : '')}
      key={props.data ? props.data.id : -1}
      data-key={props.data ? props.data.id : -1}
    >
      <div className={props.className + '-contents label-contents'}>
        <div><div className='extitle' style={{ backgroundColor: color}}>{exTitle}</div></div>
        <div className="label-contents-text">{props.data ? props.data.contents : undefined}</div>
        <div className={props.className + '-contents-btn label-contents-btn'+(props.flag ? ' hidden': '')}>
          <button
            className={props.className + '-edit-btn label-edit-btn'}
            onClick={(e) => toggleLabelDetailEventHandler(e)}
          >
            Edit
          </button>
          <button
            className={props.className + '-delete-btn label-delete-btn'}
            onClick={(e) => deleteLabelEventHandler(e)}
          >
            Delete
          </button>
        </div>
      </div>
      <form
        className={
          props.className + '-input-form input-form' + (props.flag ? '' : ' hidden')
        }
      >
        <div className={props.className + '-input-wrapper input-wrapper'}>
          <div>
            <div>Label name</div>
            <input
              type="text"
              value={titleRef.current.value}
              ref={titleRef}
              onChange={(e) =>
                e.target.value === ''
                  ? setExTitle('Label preview')
                  : setExTitle(e.target.value)
              }
            />
          </div>
          <div>
            <div>Description</div>
            <input
              type="text"
              defaultValue={contentsRef.current.value}
              ref={contentsRef}
            />
          </div>
          <div>
            <div>Color</div>
            <div className={props.className + '-input-color-btn color-btn'}>
              <button
                className="refresh-button"
                onClick={(e) => {
                  e.preventDefault();
                  setColor(randomColor());
                }}
              >
                <svg
                  className="octicon octicon-sync js-new-label-color-icon text-gray-dark"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"
                  ></path>
                </svg>
              </button>
              <input type="text" ref={colorRef} value={color} onChange={ (e) => setColor(e.target.value)}/>
            </div>
          </div>
          <div className={props.className + '-input-btns input-btns'}>
            <button onClick={(e) => resetDataEventHandler(e)}>Cancel</button>
            <button
              onClick={(e) => clickChangeEventHandler(e)}
              className="create-btn"
              disabled={!titleRef.current.value}
            >
              {props.data ? 'Save Changes' : 'Create label'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
