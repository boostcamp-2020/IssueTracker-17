const filterInitialState = {
  author: { text: '', id: -1 },
  labels: { text: '', id: -1 },
  milestone: { text: '', id: -1 },
  asignee: { text: '', id: -1 },
};
export function filterReducer(state = filterInitialState, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.filter]: { ...state[action.filter], text: action.data, id: action.id },
      };
    case 'delete':
      return {
        ...state,
        [action.filter]: { text: '', id: -1 },
      };
    case 'deleteAll':
      return {
        ...state,
        author: { ...state.author, text: '', id: -1 },
        labels: { ...state.labels, text: '', id: -1 },
        milestone: { ...state.milestone, text: '', id: -1 },
        asignee: { ...state.asignee, text: '', id: -1 },
      };
    default:
      throw new Error();
  }
}
