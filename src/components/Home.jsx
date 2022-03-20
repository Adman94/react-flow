import React, {Fragment, useState} from 'react'
import Flow from './Flow'
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
import AddNodeForm from './AddNodeForm'
import {useSelector} from 'react-redux'

const Home = () => {
	const form = useSelector(state => state.form);
	return (
		<Fragment>
			<ReactFlowProvider>
	      <Flow />
	      {form.show && <AddNodeForm />}
	    </ReactFlowProvider>
		</Fragment>
	)
}

export default Home