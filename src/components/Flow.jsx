import React, { useState, useMemo, useCallback, useEffect } from 'react'
import ReactFlow, { addEdge, applyNodeChanges, applyEdgeChanges, ReactFlowProvider, useReactFlow, MiniMap, Controls, useNodes, useEdges } from 'react-flow-renderer';
import TwoColumnTable from './TwoColumnTable'
import SingleColumnTable from './SingleColumnTable'
import ThreeColumnTable from './ThreeColumnTable'
import {useSelector, useDispatch} from 'react-redux'
import { createNewEdge } from '../actions/edges'
import { createNewNode } from '../actions/nodes'
import {showForm} from '../actions/form'

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};

const connectionLineStyle = { stroke: 'white' };
const defaultEdgeOptions = { animated: true };

const Flow = () => {
  const generalState = useSelector(state => state.general);
  const initialNodes = useSelector(state => state.nodes);
  const initialEdges = useSelector(state => state.edges);
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges);
  const dispatch = useDispatch();
  const reactFlowEdges = useEdges();
  const reactFlowNodes = useNodes();

  useEffect(()=>{
    dispatch(createNewEdge(edges));
  }, [edges]);

  useEffect(()=>{
    dispatch(createNewNode(nodes))
  }, [nodes]);

  useEffect(()=>{
    if(generalState.nodes.length > 0){
      setNodes([])
      setTimeout(()=>{
        setNodes([...generalState.nodes])
      }, 100)
      console.log('nodes', nodes)
    }else{
      setNodes(initialNodes)
    }
  }, [generalState.nodes])

  const nodeTypes = useMemo(()=> ({
    twoColumnTable: TwoColumnTable,
    singleColumnTable: SingleColumnTable,
    threeColumnTable: ThreeColumnTable
  }), []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{
          backgroundColor: '#D3D2E5',
        }}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
      <button onClick={()=> dispatch(showForm())} className="btn-add">
        add node
      </button>
    </>
  );
}

export default Flow