import React from 'react';
import EditMileStoneComponent from '../components/editMileStone';
import { Header } from 'Components/Header/Header';

function EditMileStonePage({ match }) {
  return (
    <>
      <Header />
      <EditMileStoneComponent match={match} />
    </>
  );
}

export default EditMileStonePage;
