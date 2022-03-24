const initialEdges = [];

const edgesReducer = (state=initialEdges, action) => {
  switch(action.type){
    case 'CREATE_EDGE':
      return [...action.data];
    default:
      return state;
  }
}

export default edgesReducer