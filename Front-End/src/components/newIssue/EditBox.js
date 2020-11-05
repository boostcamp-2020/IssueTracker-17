import React, { useState, useEffect } from 'react';
import NumCharacters from './NumCharacters.js';
import useDebounce from '../../util/useDebounce.js';

const EditBox = () => {
  const [content, setContent] = useState('');
  const [numCharacters, setNumCharacters] = useState(content.length);

  const debouncedContent = useDebounce(content, 1000);

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (debouncedContent || debouncedContent === '') {
      setNumCharacters(debouncedContent.length);
    }
  });

  return (
    <div className="editbox">
      <textarea className="editbox__title" />
      <div className="editbox__tabs">
        <div className="editbox__writetab">Write</div>
      </div>
      <textarea className="editbox__content" onChange={updateContent} />
      <div className="editbox__uploader">Attatch files by selecting here</div>
      <NumCharacters numCharacters={numCharacters}></NumCharacters>
      <div className="editbox__bottom">
        <button className="editbox__cancel">Cancel</button>
        <button className="editbox__submit">Submit new issue</button>
      </div>
    </div>
  );
};

export default EditBox;
