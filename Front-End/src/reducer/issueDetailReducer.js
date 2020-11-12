import { getComments } from 'Api';

export function issueDetailReducer(state, action) {
  let newRows = null;
  switch (action.type) {
    case 'UPDATE':
      newRows = action.newRows;
      break;
    case 'INIT':
      return Object.assign({}, action.initData);
    case 'EDIT_TITLE':
      return { ...state, editTitle: !state.editTitle };
    case 'UPDATE_TITLE':
      return { ...state, title: action.title };
    case 'EDIT_COMMENT':
      return {
        ...state,
        comments: state.comments.map((value) => {
          if (value.id == action.commentId) value.edit = !value.edit;
          return value;
        }),
      };
    case 'EDIT_ISSUE':
      return { ...state, edit: !state.edit };
    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((value) => {
          if (value.id == action.commentId) {
            value.contents = action.contents;
            value.edit = !value.edit;
          }
          return value;
        }),
      };
    case 'UPDATE_ISSUE':
      return { ...state, contents: action.contents, edit: !state.edit };
    case 'REFRESH_COMMENTS':
      return {
        ...state,
        comments: action.comments,
      };
    case 'CLOSE_ISSUE':
      return { ...state, status: 'closed' };
    case 'REOPEN_ISSUE':
      return { ...state, status: 'open' };
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
