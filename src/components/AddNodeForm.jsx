import React, { useState, useCallback, useEffect } from 'react'
import './AddNodeForm.css'
import { v4 as uuidv4 } from 'uuid';
import ReactFlow, { useReactFlow, useNodes, useEdges } from 'react-flow-renderer';
import { createNewNode, deleteNode } from '../actions/nodes'
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
	const [updateCell, setUpdateCell] = useState({show: false, id: ""});
	const [latexFormula, setLatexFormula] = useState("");
	const [showCustomTablePreview, setShowCustomTablePreview] = useState(false);
	const [headerThree, setHeaderThree] = useState("");
	const [errorMessage, setErrorMessage] = useState('');
	const [updateNodeData, setUpdateNodeData] = useState(false);
	const [numberOfCustomColumns, setNumberOfCustomColumns] = useState(4);
	const [customTableOptions, setCustomTableOptions] = useState([]);
	const [customTableHeaders, setCustomTableHeaders] = useState([]);
	const [customTableRowData, setCustomTableRowData] = useState([])
	const nodes = useNodes();
  const edges = useEdges();
	const reactFlowInstance = useReactFlow();
	const dispatch = useDispatch();
	const stateNodes = useSelector(state => state.nodes);
	const formState = useSelector(state => state.form);

	useEffect(()=> {
		setCustomTableHeaders(Array.from({length: numberOfCustomColumns}).map(num => ""));
		setCustomTableRowData(Array.from({length: numberOfCustomColumns}).map(num => ""));
	}, [numberOfCustomColumns])

	useEffect(() => {
		if(formState.title){
			setTitle(formState.title);
			setOptions(formState.options);
			if(formState.tableType === "threeColumnTable"){
				setHeaderOne(formState.headers[0])
				setHeaderTwo(formState.headers[1])
				setHeaderThree(formState.headers[2])
				setTableType('threeColumnTable')
				setLatexFormula(formState.latexFormula)
			}else if(formState.tableType === "twoColumnTable"){
				setHeaderOne(formState.headers[0])
				setHeaderTwo(formState.headers[1])
				setTableType('twoColumnTable')
				setLatexFormula(formState.latexFormula)
			}else if(formState.tableType === "custom"){
				setTableType("custom");
				setCustomTableHeaders([...formState.headers])
				setCustomTableOptions(formState.options)
				setLatexFormula(formState.latexFormula)
			}else{
				setTableType('singleColumnTable')
				setLatexFormula(formState.latexFormula)
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
 	setLatexFormula('')
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
  			stateNodes[nodeIndex].data.latexFormula = latexFormula;
  			if(formState.headers.length > 1){
  				if(formState.tableType === "threeColumnTable"){
  					stateNodes[nodeIndex].data.headers = [headerOne, headerTwo, headerThree]
  				}else{
  					stateNodes[nodeIndex].data.headers = [headerOne, headerTwo]
  				}
  			}
  			dispatch(updateTable(stateNodes));
  			resetHeadersInput();
  			resetDataInput();
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
			        latexFormula, 
			        options: options
			      },
			      type: 'singleColumnTable'
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
			        latexFormula, 
			        options: options,
			        headers: [headerOne, headerTwo]
			      },
			      type: 'twoColumnTable'
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
			        latexFormula, 
			        options: options,
			        headers: [headerOne, headerTwo, headerThree]
			      },
			      type: 'threeColumnTable'
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

  const handleDeleteTable = (id) => {
  	if(confirm("Delete Table")){
  		dispatch(deleteNode(id))
  		dispatch(updateTable(stateNodes.filter(nds => nds.id !== id)));
  		dispatch(hideForm())
  	}
  }

  const editCell = (index, tableType) => {
  	if(tableType === "singleColumnTable"){
  		setDataOne(options[index])
  		setUpdateCell({show: true, index})
  	}else if(tableType === "twoColumnTable"){
  		setDataOne(options[index][0])
  		setDataTwo(options[index][1])
  		setUpdateCell({show: true, index})
  	}else if(tableType === "threeColumnTable"){
  		setDataOne(options[index][0])
  		setDataTwo(options[index][1])
  		setDataThree(options[index][2])
  		setUpdateCell({show: true, index})
  	}else{
  		setCustomTableRowData(customTableOptions[index])
  		setUpdateCell({show: true, index})
  	}
  }

  const handleUpdateCell = (index, tableType) => {
  	if(tableType === "singleColumnTable"){
  		options[index] = dataOne
  		setOptions(options)
  		resetDataInput()
  		setUpdateCell({show: false, index: ""})
  	}else if(tableType === "twoColumnTable"){
  		setDataOne(options[index][0])
  		setDataTwo()
  		options[index][0] = dataOne;
  		options[index][1] = dataTwo
  		setOptions(options)
  		resetDataInput()
  		setUpdateCell({show: false, index: ""})
  	}else if(tableType === "threeColumnTable"){
  		options[index][0] = dataOne
  		options[index][1] = dataTwo
  		options[index][2] = dataThree
  		setOptions(options)
  		resetDataInput()
  		setUpdateCell({show: false, index: ""})
  	}else{
  		customTableOptions[index] = customTableRowData;
  		setCustomTableOptions(customTableOptions)
  		setCustomTableRowData([])
  		setUpdateCell({show: false, index: ""})
  	}
  }

  const handleCustomTableOptionDelete = (index) => {
  	setCustomTableOptions(customTableOptions.filter((_, i) => i !== index))
  }

  const createCustomTableRowData = () => {
  	setCustomTableOptions([...customTableOptions, customTableRowData]);
  	setCustomTableRowData([...customTableRowData].fill(""))
  }

  const handleCustomTableSubmit = () => {
  	if(updateNodeData){
  			const nodeIndex = stateNodes.findIndex((node)=> node.id == formState.id);
  			stateNodes[nodeIndex].data.title = title;
  			stateNodes[nodeIndex].data.options = options;
  			stateNodes[nodeIndex].data.latexFormula = latexFormula;
  			stateNodes[nodeIndex].data.headers = customTableHeaders
  			dispatch(updateTable(stateNodes));
  			resetHeadersInput();
  			resetDataInput();
  			setCustomTableRowData([]);
	    	setCustomTableOptions([]);
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
	        latexFormula, 
	        options: customTableOptions,
	        headers: customTableHeaders
	      },
	      type: 'custom'
	    };
	    reactFlowInstance.addNodes(newNode);
	    dispatch(createNewNode([...stateNodes, newNode]));
	    setCustomTableRowData([]);
	    setCustomTableOptions([]);
	    resetHeadersInput()
	    setShowCustomTablePreview(false)
	  }
  }

	return (
		<div className="add__node">
			{errorMessage &&
				<p className="error__message">{errorMessage}</p>
			}
			{
				showCustomTablePreview &&
				<div className="preview-two">
				<span onClick={()=> setShowCustomTablePreview(false)}>X</span>
				<div className="preview-two-container">
					<h1>Custom Table</h1>
					<div className="flex">
						<div className="table-container">
							<table>
								<thead>
									<tr>
										{customTableHeaders.map((header, i) => <th key={header + "" + i}>{header}</th>)}
									</tr>
								</thead>
								<tbody>
									{
										customTableOptions.map((option, i) => (
											<tr key={option + "" + i}>
												{
													option.map((data, j) => <td key={data + "" + j}>{data}</td>)
												}
												<p className="edit" onClick={()=> editCell(i, tableType)}>🖊</p>
												<p onClick={()=> handleCustomTableOptionDelete(i)}>🗑</p>
											</tr>
										))
									}
								</tbody>
							</table>
						</div>
						<div className="form__container">
							<label>Input column data</label>
							{Array.from({length: numberOfCustomColumns}).map((num, i) => <input type="text" key={i} placeholder={`Column ${i + 1}`} style={{marginTop: "1em"}} value={customTableRowData[i] ? customTableRowData[i] : ''} onChange={(e)=> {customTableRowData[i] = e.target.value; setCustomTableRowData([...customTableRowData])}} />)}
							{updateCell.show && <button style={{background: "#35A7FF", color: "#fff", marginBottom: "4em"}} onClick={()=> handleUpdateCell(updateCell.index, tableType)}>Update Cell</button>}
							<button onClick={createCustomTableRowData}>Enter values</button>
							<button onClick={handleCustomTableSubmit}>{!updateNodeData ? 'Create Table' : 'Update Table'}</button>
							{updateNodeData && <button style={{background: "red", color: "#fff"}} onClick={()=> handleDeleteTable(formState.id)}>Delete Table</button>}							
						</div>
					</div>
				</div>
			</div>
			}
			<div className="container">
				<h1>{!updateNodeData ? 'Add Table' : 'Update Table'}</h1>
				<span onClick={()=> dispatch(hideForm())}>X</span>
				<form onSubmit={handleSubmit}>
					<label>Table Name:</label>
					<input 
						type="text" 
						placeholder="Name"
						value={title}
						onChange={(e)=> setTitle(e.target.value)}
					 />
					 <label>Latex formula:</label>
					<input 
						type="text" 
						placeholder="Latex Formula"
						value={latexFormula}
						onChange={(e)=> setLatexFormula(e.target.value)}
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
						<label>
							<input 
								type="radio" 
								name="table-type"
								checked={tableType === "custom" && true}  
								onChange={()=> {setOptions([]); setTableType("custom");}} />
							<p>Custom</p>							
						</label>
					</div>
					{tableType === "custom" && <div>
						<label>Enter Number of Columns</label>
						<input type="number" value={numberOfCustomColumns} onChange={(e)=> setNumberOfCustomColumns(e.target.value)} />
					 </div>}
					 {tableType === "custom" && <label>Enter columns header</label>}
					{
						tableType === "custom" && Array.from({length: numberOfCustomColumns}).map((num, i) => <input type="text" key={i} placeholder={`Header ${i + 1}`} style={{marginTop: "1em"}} value={customTableHeaders[i] ? customTableHeaders[i] : ''} onChange={(e)=> {customTableHeaders[i] = e.target.value; setCustomTableHeaders([...customTableHeaders])}} />)
					}
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
						{tableType !== "custom" && <input 
								type="text" 
								placeholder="Data 1"
								value={dataOne}
								onChange={(e)=> setDataOne(e.target.value)}
							/>
						}
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
					{updateCell.show && <button style={{background: "#35A7FF", color: "#fff", marginBottom: "4em"}} onClick={()=> handleUpdateCell(updateCell.index, tableType)}>Update Cell</button>}
					{tableType !== "custom" &&
						<>
							<button onClick={createNewPair}>Add values</button>
							<button type="submit">{!updateNodeData ? 'Create Table' : 'Update Table'}</button>
							{updateNodeData && <button style={{background: "red", color: "#fff"}} onClick={()=> handleDeleteTable(formState.id)}>Delete Table</button>}
						</>
					}
					{tableType === "custom" &&
						<button onClick={(e)=> {e.preventDefault(); if(title){setShowCustomTablePreview(true)}else{showError("Enter Title")}}}>Preview Table</button>
					}
				</form>
				{tableType !== "custom" && <div className="preview">
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
											<p className="edit" onClick={()=> editCell(i, tableType)}>🖊</p>
											<p onClick={()=> handleDelete(i)}>🗑</p>
										</tr>
									))
								}
								{ tableType === "twoColumnTable" &&
									options.map((option, i)=>(
										<tr key={option[0] + "" + i}>
											<td>{option[0]}</td>
											<td>{option[1]}</td>
											<p className="edit" onClick={()=> editCell(i, tableType)}>🖊</p>
											<p onClick={()=> handleDelete(i)}>🗑</p>
										</tr>
									))
								}
								{ tableType === "threeColumnTable" &&
									options.map((option, i)=>(
										<tr key={option[0] + "" + i}>
											<td>{option[0]}</td>
											<td>{option[1]}</td>
											<td>{option[2]}</td>
											<p className="edit" onClick={()=> editCell(i, tableType)}>🖊</p>
											<p onClick={()=> handleDelete(i)}>🗑</p>
										</tr>
									))
								}
							</tbody>
						</table>
					}
				</div>
				}
			</div>
		</div>
		)
}

export default AddNodeForm