import React, { useState, useMemo, useCallback, useEffect } from 'react'
import ReactFlow, { ReactFlowProvider, useReactFlow, MiniMap, Controls, useNodes, useEdges } from 'react-flow-renderer';
import Table from './Table'
import {useSelector} from 'react-redux'

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};

const connectionLineStyle = { stroke: 'white' };

const Flow = ({setShowForm}) => {
  const initialNodes = useSelector(state => state.nodes);
  const initialEdges = useSelector(state => state.edges);

  const nodeTypes = useMemo(()=> ({table: Table}), [])

  return (
    <>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        defaultEdgeOptions={edgeOptions}
        nodeTypes={nodeTypes}
        fitView
        style={{
          backgroundColor: '#D3D2E5',
        }}
        connectionLineStyle={connectionLineStyle}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
      <button onClick={()=> setShowForm(true)} className="btn-add">
        add node
      </button>
    </>
  );
}

export default Flow