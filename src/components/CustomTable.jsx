import React, {Fragment} from 'react';
import "./Table.css"
import { Handle, Position } from 'react-flow-renderer';
import {useDispatch} from 'react-redux'
import {updateNodeData} from '../actions/form'

const CustomTable = ({id, data, type}) => {
	const dispatch = useDispatch();
	const handleContextMenu = (e) => {
		e.preventDefault();
		dispatch(updateNodeData(id, data.title, data.options, data.headers, type, data.latexFormula))
	}

	return (
		<Fragment>
			<Handle type="target" position={Position.Top} />
			<div className="container">
				{data.latexFormula && <p>{data.latexFormula}</p>}
				<table onContextMenu={handleContextMenu}>
					<thead>
						<tr>
							<th colSpan={data.headers.length}>{data.title}</th>
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
								<tr key={option + "" + i}>
									{
										option.map((data, i) => <td key={data + "" + i}>{data}</td>)
									}
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

export default CustomTable