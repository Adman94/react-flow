import React, { useState, useCallback, useEffect } from 'react'
import './AddNodeForm.css'
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, { useReactFlow, useNodes, useEdges } from 'react-flow-renderer';
import { createNewNode } from '../actions/nodes'
import { createNewEdge } from '../actions/edges'
import { useDispatch, useSelector } from 'react-redux'
import { hideForm } from '../actions/form'

const AddNodeForm = () => {
	const [title, setTitle] = useState('');
	const [options, setOptions] = useState([]);
	const [unit, setUnit] = useState('');
	const [range, setRange] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [updateNodeData, setUpdateNodeData] = useState(false)
	const nodes = useNodes();
  const edges = useEdges();
	const reactFlowInstance = useReactFlow();
	const dispatch = useDispatch();
	const stateNodes = useSelector(state => state.nodes);
	const formState = useSelector(state => state.form);

	useEffect(() => {
		if(formState.title){
			setTitle(formState.title);
			setOptions(formState.options);
			setUpdateNodeData(true)
		}
  }, []);

 const showError = (message) => {
 	setErrorMessage(message);
 	setTimeout(()=>{
 		setErrorMessage('')
 	}, 1500)
 }

  const createNewPair = (e) => {
  	e.preventDefault();
  	if(!title){
  		showError('Please enter a title')
  	}else if(!unit){
  		showError('Please enter a unit')
  	}else if(!range){
  		showError('Please enter a range')
  	}else{
  		setOptions([...options, [unit, range]])
  		setRange('')
  		setUnit('')
  	}
  }

  const handleSubmit = (e) => {
  	e.preventDefault();
  	if(!title){
	    showError('Please enter a title')
  	}else if(options.length < 1){
  		showError('Please create a value pair')
  	}
  	else{
  		if(updateNodeData){
  			const nodeIndex = stateNodes.findIndex((node)=> node.id == formState.id);

  			stateNodes[nodeIndex].title = title;
  			stateNodes[nodeIndex].options = options

  			console.log(stateNodes)
  			dispatch(createNewNode(stateNodes));
  			setOptions([]);
	    	setTitle('');
	    	setUpdateNodeData(false);
	    	dispatch(hideForm())
  		}else{
  			const newNode = {
	      id: uuidv4(),
	      position: {
	        x: Math.random() * 100,
	        y: Math.random() * 100,
	      },
	      data: { 
	        title, 
	        options: options,
	      },
	      type: 'table',
	    };
	    reactFlowInstance.addNodes(newNode);
	    dispatch(createNewNode([...stateNodes, newNode]));
	    setOptions([]);
	    setTitle('');
  		}
  	}
  }

	return (
		<div className="add__node">
			<div className="container">
				<h1>{!updateNodeData ? 'Add Table' : 'Update Table'}</h1>
				<span onClick={()=> dispatch(hideForm())}>X</span>
				{errorMessage &&
					<p className="error__message">{errorMessage}</p>
				}
				<form onSubmit={handleSubmit}>
					<label>Table Name:</label>
					<input 
						type="text" 
						placeholder="Name"
						value={title}
						onChange={(e)=> setTitle(e.target.value)}
					 />
					<label>Create value pair</label>
					<div className="input__row">
						<input 
							type="text" 
							placeholder="Units"
							value={unit}
							onChange={(e)=> setUnit(e.target.value)}
						/>
						<input 
							type="text" 
							placeholder="Range"
							value={range}
							onChange={(e)=> setRange(e.target.value)}
						/>
					</div>
					<button onClick={createNewPair}>Add Pair</button>
					<button type="submit">{!updateNodeData ? 'Create Table' : 'Update Table'}</button>
				</form>
				<div className="preview">
					{
						options.length > 0 &&
						<table>
						<thead>
							<tr>
								<th>Units</th>
								<th>Range</th>
							</tr>
						</thead>
						<tbody>
							{
								options.map((option, i)=>(
									<tr key={option[0] + "" + i}>
										<td>{option[0]}</td>
										<td>{option[1]}</td>
									</tr>
								))
							}
						</tbody>
					</table>
					}
				</div>
			</div>
		</div>
		)
}

export default AddNodeForm