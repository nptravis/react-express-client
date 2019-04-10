export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('userData');
		if (serializedState === null) {
			return undefined;
		} 

		return JSON.parse(serializedState)
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = {...state};
		localStorage.setItem('userData', JSON.stringify(serializedState));

	} catch (err) {
		// write errors
	}
}