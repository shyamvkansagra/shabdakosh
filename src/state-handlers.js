export const searchHandler = (searchTerm, newSearchTerm) => {
	if (searchTerm && !newSearchTerm) {
		return {
			searchTerm: '',
            wordSuggestions: [],
            noneFound: false,
		};
	}

	return { searchTerm: newSearchTerm };
}