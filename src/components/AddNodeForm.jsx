import React, { useState, useCallback, useEffect } from 'react'
import './AddNodeForm.css'
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, { useReactFlow, useNodes, useEdges } from 'react-flow-renderer';
import { createNewNode } from '../actions/nodes'
import { createNewEdge } from '../actions/edges'
import { updateTable } from '../actions/general'
import { useDispatch, useSelector } from 'react-redux'
import { hideForm } from '../actions/form'

const AddNodeForm = () => {
	const [title, setTitle] = useState('');
	const [tableType, setTableType] = useState('singleColumnTable');
	const [options, setOptions] = useState([]);
	const [dataOne, setDataOne] = useState('');
	const [dataTwo, setDataTwo] = useState('');
	const [dataThree, setDataThree] = useState('');
	const [headerOne, setHeaderOne] = useState("");
	const [headerTwo, setHeaderTwo] = useState("");
	const [headerThree, setHeaderThree] = useState("");
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
			if(formState.tableType === "threeColumnTable"){
				setHeaderOne(formState.headers[0])
				setHeaderTwo(formState.headers[1])
				setHeaderThree(formState.headers[2])
				setTableType('threeColumnTable')
			}else if(formState.tableType === "twoColumnTable"){
				setHeaderOne(formState.headers[0])
				setHeaderTwo(formState.headers[1])
				setTableType('twoColumnTable')
			}else{
				setTableType('singleColumnTable')
			}
			setUpdateNodeData(true)
		}
  }, []);

 const showError = (message) => {
 	setErrorMessage(message);
 	setTimeout(()=>{
 		setErrorMessage('')
 	}, 1500)
 }

 const resetDataInput = () => {
 	setDataOne('');
 	setDataTwo('');
 	setDataThree('');
 }

 const resetHeadersInput = () => {
 	setHeaderOne('');
 	setHeaderTwo('');
 	setHeaderThree('');
 	setOptions([]);
 	setTitle('');
 }

  const createNewPair = (e) => {
  	e.preventDefault();
  	if(!title){
  		showError('Please enter a title')
  	}else if(!dataOne){
  		showError('Please enter a value for data one')
  	}else if((tableType === "twoColumnTable" || tableType === "threeColumnTable") && !dataTwo){
  		showError('Please enter a value for data two')
  	}else if(tableType === "threeColumnTable" && !dataThree){
  		showError('Please enter a value for data three')
  	}else{
  		if(tableType === "threeColumnTable"){
  			setOptions([...options, [dataOne, dataTwo, dataThree]])
  			resetDataInput()
  		}else if(tableType === "twoColumnTable"){
  			setOptions([...options, [dataOne, dataTwo]])
  			resetDataInput()
  		}else{
  			setOptions([...options, dataOne])
  			resetDataInput()
  		}
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
  			stateNodes[nodeIndex].data.title = title;
  			stateNodes[nodeIndex].data.options = options;
  			if(formState.headers.length > 1){
  				if(formState.tableType === "threeColumnTable"){
  					stateNodes[nodeIndex].data.headers = [headerOne, headerTwo, headerThree]
  				}else{
  					stateNodes[nodeIndex].data.headers = [headerOne, headerTwo]
  				}
  			}
  			dispatch(updateTable(stateNodes));
  			resetHeadersInput();
	    	setUpdateNodeData(false);
	    	dispatch(hideForm())
  		}else{
  			if(tableType === "singleColumnTable"){
	  			const newNode = {
			      id: uuidv4(),
			      position: {
			        x: Math.random() * 100,
			        y: Math.random() * 100,
			      },
			      data: { 
			        title, 
			        options: options
			      },
			      type: 'singleColumnTable',
			    };
			    reactFlowInstance.addNodes(newNode);
			    dispatch(createNewNode([...stateNodes, newNode]));
			    resetHeadersInput();
  			}else if(tableType === "twoColumnTable"){
  				const newNode = {
			      id: uuidv4(),
			      position: {
			        x: Math.random() * 100,
			        y: Math.random() * 100,
			      },
			      data: { 
			        title, 
			        options: options,
			        headers: [headerOne, headerTwo]
			      },
			      type: 'twoColumnTable',
			    };
			    reactFlowInstance.addNodes(newNode);
			    dispatch(createNewNode([...stateNodes, newNode]));
			    resetHeadersInput();
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
			        headers: [headerOne, headerTwo, headerThree]
			      },
			      type: 'threeColumnTable',
			    };
			    reactFlowInstance.addNodes(newNode);
			    dispatch(createNewNode([...stateNodes, newNode]));
			    resetHeadersInput();
  			}
  		}
  	}
  }

  const handleDelete = (index) => {
  	setOptions(options.filter((_, i) => i !== index))
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
					<label>Table Type</label>
					<div className="types">
						<label>
							<input 
								type="radio" 
								name="table-type"
								checked={tableType === "singleColumnTable" && true} 
								onChange={()=> {setOptions([]); setTableType("singleColumnTable")}} />
							<p>Table-1</p>
						</label>
						<label>
							<input 
								type="radio" 
								name="table-type"
								checked={tableType === "twoColumnTable" && true}  
								onChange={()=> {setOptions([]); setTableType("twoColumnTable")}} />
							<p>Table-2</p>
						</label>
						<label>
							<input 
								type="radio" 
								name="table-type"
								checked={tableType === "threeColumnTable" && true}  
								onChange={()=> {setOptions([]); setTableType("threeColumnTable");}} />
							<p>Table-3</p>							
						</label>
					</div>
							{ (tableType === "twoColumnTable" || tableType === "threeColumnTable") &&
								<>
									<div className="headers__input__section">
										<label>Enter column headers</label>
										<div className="headers__name">
											<input 
												type="text" 
												placeholder="Header 1"
												value={headerOne}
												onChange={(e)=> setHeaderOne(e.target.value)}
											/>
											<input 
												type="text" 
												placeholder="Header 2"
												value={headerTwo}
												onChange={(e)=> setHeaderTwo(e.target.value)} 
											/>
										</div>
									</div>
								</>
							}
							{ tableType === "threeColumnTable" &&
								<input 
									type="text" 
									placeholder="Header 3" 
									value={headerThree}
									onChange={(e)=> setHeaderThree(e.target.value)}
								/>
							}
					<label>Enter values</label>
					<div className="input__row">
						<input 
							type="text" 
							placeholder="Data 1"
							value={dataOne}
							onChange={(e)=> setDataOne(e.target.value)}
						/>
						{
							(tableType === "twoColumnTable" || tableType === "threeColumnTable") &&
							<>
								<input 
									type="text" 
									placeholder="Data 2"
									value={dataTwo}
									onChange={(e)=> setDataTwo(e.target.value)}
								/>
							</>
						}
						{tableType === "threeColumnTable" && 
							(
								<input 
									type="text" 
									placeholder="Data 3"
									value={dataThree}
									onChange={(e)=> setDataThree(e.target.value)}
								/>
							)
						}
					</div>
					<button onClick={createNewPair}>Add values</button>
					<button type="submit">{!updateNodeData ? 'Create Table' : 'Update Table'}</button>
				</form>
				<div className="preview">
					{
						options.length > 0 &&
						<table>
						<thead>
							{
								tableType === "twoColumnTable" && 
								<tr>
									<th>{headerOne}</th>
									<th>{headerTwo}</th>				
								</tr>
							}
							{
								tableType === "threeColumnTable" && 
								<tr>
									<th>{headerOne}</th>
									<th>{headerTwo}</th>
									<th>{headerThree}</th>				
								</tr>
							}
						</thead>
						<tbody>
						{ tableType === "singleColumnTable" &&
								options.map((option, i)=>(
									<tr key={option + "" + i}>
										<td>{option}</td>
										<p onClick={()=> handleDelete(i)}>-</p>
									</tr>
								))
							}
							{ tableType === "twoColumnTable" &&
								options.map((option, i)=>(
									<tr key={option[0] + "" + i}>
										<td>{option[0]}</td>
										<td>{option[1]}</td>
										<p onClick={()=> handleDelete(i)}>-</p>
									</tr>
								))
							}
							{ tableType === "threeColumnTable" &&
								options.map((option, i)=>(
									<tr key={option[0] + "" + i}>
										<td>{option[0]}</td>
										<td>{option[1]}</td>
										<td>{option[2]}</td>
										<p onClick={()=> handleDelete(i)}>-</p>
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