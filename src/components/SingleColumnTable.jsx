import React, {Fragment} from 'react';
import "./Table.css"
import { Handle, Position } from 'react-flow-renderer';
import {useDispatch} from 'react-redux'
import {updateNodeData} from '../actions/form'
import { hideForm } from '../actions/form'

const SingleColumnTable = ({id, data, type}) => {
	const dispatch = useDispatch();
	const handleContextMenu = (e) => {
		e.preventDefault();
		dispatch(hideForm());
		setTimeout(()=>{
			dispatch(updateNodeData(id, data.title, data.options, [], type, data.latexFormula))
		}, 10)
	}

	return (
		<Fragment>
			<Handle type="target" position={Position.Top}  />
			<div className="container">
				{data.latexFormula && <p>{data.latexFormula}</p>}
				<table onContextMenu={handleContextMenu}>
					<thead>
						<tr>
							<th>{data.title}</th>
						</tr>
					</thead>
					<tbody>
						{
							data.options.map((option, i) => (
								<tr key={option + "" + i}>
									<td>{option}</td>
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

export default SingleColumnTable