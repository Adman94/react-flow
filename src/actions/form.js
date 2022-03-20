export const showForm = () => ({type: 'SHOW_FORM'});
export const hideForm = () => ({type: 'HIDE_FORM'});
export const updateNodeData = (id, title, options) => ({
	type: 'UPDATE_NODE_DATA',
	id,
	title,
	options
})