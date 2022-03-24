export const createNewNode = (data) => ({
	type: 'CREATE_NODE',
	data
})

export const deleteNode = (id) => ({
	type: "DELETE_NODE",
	id
})