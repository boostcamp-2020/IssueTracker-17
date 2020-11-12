export function issueReducer(state, action) {
  switch (action.type) {
    case 'pushAll':
      return {
        issueList: [...action.data.issues],
        labelList: [...action.data.labels],
        mileStoneList: [...action.data.milestones],
        assigneeList: [...action.data.users],
        authorList: [...action.data.users],
      };
    case 'pushIssues':
      return {
        ...state,
        issueList: [...action.data],
      };
    default:
      throw new Error();
  }
}
