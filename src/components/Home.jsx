import React, {Fragment, useState} from 'react'
import Flow from './Flow'
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
import AddNodeForm from './AddNodeForm'

const Home = () => {
	const [showForm, setShowForm] = useState(false);
	return (
		<Fragment>
			<ReactFlowProvider>
	      <Flow setShowForm={setShowForm} />
	      {showForm && <AddNodeForm setShowForm={setShowForm} />}
	    </ReactFlowProvider>
		</Fragment>
	)
}

export default Home