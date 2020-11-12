export function issueDetailReducer(state, action) {
  let newRows = null;
  switch (action.type) {
    case 'UPDATE':
      newRows = action.newRows;
      break;
    case 'INIT':
      return Object.assign({}, action.initData);
    default:
      throw new Error();
  }

  switch (action.category) {
    case 'Assignees':
      return Object.assign(state, { assignees: newRows });
    case 'Labels':
      return Object.assign(state, { labels: newRows });
    case 'Milestone':
      return Object.assign(state, { milestones: newRows });
    default:
      throw new Error();
  }
}
