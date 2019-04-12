export default function cacheData(
	state = {
		departments: {}
	},
	action
) {
	switch (action.type) {
		case 'LOADING_DEPARTMENTS':
			return { ...state, loading: true }
		case 'LOADED_DEPARTMENTS':
			let newDepartments = { ...state.departemnts }
			action.payload.map(dept => {
				newDepartments[dept.id] = dept
			})
			return { ...state, departemnts: newDepartments }
		default:
			return state
	}
}
