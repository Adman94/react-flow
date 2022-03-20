import React, {Fragment} from 'react';
import "./Table.css"
import { Handle, Position } from 'react-flow-renderer';

const Table = ({data}) => {
	return (
		<Fragment>
			<Handle type="target" position={Position.Top}  />
			<table>
				<thead>
					<tr>
						<th colSpan="2">{data.title}</th>
					</tr>
				</thead>
				<tbody>
					{
						data.options.map((option, i) => (
							<tr key={option[0] + "" + i}>
								<td>{option[0]}</td>
								<td>{option[1]}</td>
							</tr>
						))
					}
				</tbody>
			</table>
			<Handle type="source" position={Position.Right} id="attach" />
			<Handle position={Position.Bottom} id="output" />
			<Handle type="target" position={Position.Left} id="atach2" />
		</Fragment>
		)
}

export default Table