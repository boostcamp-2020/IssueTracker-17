import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../index';
import { FilterSelect } from './FilterSelect/FilterSelect';
import MilestonePopUpRow from 'NewIssue/MilestonePopUpRow';
import LabelPopUpRow from 'NewIssue/LabelPopUpRow';
import AssigneePopUpRow from 'NewIssue/AssigneePopUpRow';

const FilterSelectAreaForm = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
`;

const FilterSelectArea = () => {
  const { store } = useContext(FilterContext);
  const filterList = [
    { title: 'Author', query: 'author', list: store.authorList, component: AssigneePopUpRow },
    { title: 'Label', query:'labels', list: store.labelList, component: LabelPopUpRow },
    { title: 'Milestones', query:'milestone', list: store.mileStoneList, component: MilestonePopUpRow },
    { title: 'Assignee', query:'asignee', list: store.assigneeList, component: AssigneePopUpRow },
  ];
  return (
    <FilterSelectAreaForm>
      {filterList.map((filter, idx) => (
        <FilterSelect key={idx} list={filter} />
      ))}
    </FilterSelectAreaForm>
  );
};

export { FilterSelectArea };
