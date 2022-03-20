const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }
];

const edgesReducer = (state=initialEdges, action) => {
  switch(action.type){
    case 'CREATE_EDGE':
      return [...action.data];
    default:
      return state;
  }
}

export default edgesReducer