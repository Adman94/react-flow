const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { 
      title: 'test 1', 
      options: [
        ["Book", "paper"],
        ["tyre", "rubber"]
    ]
  },
    type: 'table',
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const nodesReducer = (state=initialNodes, action) => {
	switch(action.type){
		case 'CREATE_NODE':
			return [...action.data];
		default:
			return state;
	}
}

export default nodesReducer