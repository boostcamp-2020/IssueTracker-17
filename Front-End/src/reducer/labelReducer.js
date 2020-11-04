export function labelReducer(state, action) {
  switch (action.type) {
    case 'push':
      return { list: [...state.list, action.data] };
    case 'update':
      return { list: [...state.list.slice(0, action.idx), action.data, ...state.list.slice(action.idx+1)] };
    default:
      throw new Error();
  }
}
