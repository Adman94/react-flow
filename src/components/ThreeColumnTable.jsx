import React, {Fragment} from 'react';
import "./Table.css"
import { Handle, Position } from 'react-flow-renderer';
import {useDispatch} from 'react-redux'
import {updateNodeData} from '../actions/form'
import { hideForm } from '../actions/form'

const ThreeColumnTable = ({id, data, type}) => {
	const dispatch = useDispatch();
	const handleContextMenu = (e) => {
		e.preventDefault();
		dispatch(hideForm());
		setTimeout(()=>{
			dispatch(updateNodeData(id, data.title, data.options, data.headers, type, data.latexFormula))
		}, 10)
	}
	return (
		<Fragment>
			<Handle type="target" position={Position.Top}  />
			<div className='container'>
				{data.latexFormula && <p>{data.latexFormula}</p>}
				<table onContextMenu={handleContextMenu}>
				<thead>
					<tr>
						<th colSpan="3">{data.title}</th>
					</tr>
					<tr>
						{
							data.headers.map((header, i) => (
								<th key={header + "" + 1}>{header}</th>
							))
						}
					</tr>
				</thead>
				<tbody>
					{
						data.options.map((option, i) => (
							<tr key={option[0] + "" + i}>
								<td>{option[0]}</td>
								<td>{option[1]}</td>
								<td>{option[2]}</td>
							</tr>
						))
					}
				</tbody>
			</table>
			</div>
			<Handle type="source" position={Position.Right} id="attach" />
			<Handle position={Position.Bottom} id="output" />
			<Handle type="target" position={Position.Left} id="atach2" />
		</Fragment>
		)
}

export default ThreeColumnTable