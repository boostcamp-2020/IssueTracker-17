import React from 'react';
import { Label } from './makeLabel';

export function TopLinks() {
  function toggleLabelInputEventHandler(e) {
    const detailForm = document.querySelector('.top-input-wrapper');
    detailForm.classList.toggle('hidden');
  }

  return (
    <div className="top-links">
      <button className="label-btn">Labels</button>
      <button className="milestone-btn">Milestones</button>
      <button
        className="new-label-btn"
        onClick={(e) => toggleLabelInputEventHandler(e)}
      >
        New Label
      </button>
      <Label className={'top-input'} flag={1} />
    </div>
  );
}
