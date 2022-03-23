const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { 
      title: 'test 1',
      headers: ["Data", "Val"], 
      options: [
        ["Book", "paper"],
        ["tyre", "rubber"]
    ]
  },
    type: 'twoColumnTable',
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    data: { 
      title: 'test 3',
      headers: ["Data", "Val", "Extra"], 
      options: [
        ["Book", "paper", "pulp"],
        ["tyre", "rubber", "latex"]
    ]
  },
    type: 'threeColumnTable',
    position: { x: 230, y: 115 },
  },
  {
    id: '4',
    data: { 
      title: 'test 2', 
      options: [
        "Book", 
        "paper",
        "tyre"
    ]
  },
    type: 'singleColumnTable',
    position: { x: 400, y: 125 },
  },
  {
    id: '5',
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