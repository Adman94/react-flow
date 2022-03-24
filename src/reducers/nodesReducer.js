const initialNodes = [
  {
    id: '1',
    data: { 
      title: 'test 1',
      latexFormula: "Latex Formula",
      headers: ["Data", "Val"], 
      options: [
        ["Book", "paper"],
        ["tyre", "rubber"]
    ]
  },
    type: 'twoColumnTable',
    position: { x: 76, y: 136 },
  },
  {
    id: '2',
    data: { 
      title: 'Students',
      latexFormula: "grade = A",
      headers: ["Name", "Age", "Grade"], 
      options: [
        ["Ben", "12", "A"],
        ["Chris", "13", "B"]
    ]
  },
    type: 'threeColumnTable',
    position: { x: 222, y: 62 },
  },
  {
    id: '3',
    data: { 
      title: 'Motion',
      latexFormula: "e=mc", 
      options: [
        "Book", 
        "paper",
        "tyre"
    ]
  },
    type: 'singleColumnTable',
    position: { x: 411, y: 102 },
  }
];

const nodesReducer = (state=initialNodes, action) => {
	switch(action.type){
		case 'CREATE_NODE':
			return [...action.data];
    case 'DELETE_NODE':
      return [...state.filter(nds => nds.id !== action.id)];
		default:
			return state;
	}
}

export default nodesReducer