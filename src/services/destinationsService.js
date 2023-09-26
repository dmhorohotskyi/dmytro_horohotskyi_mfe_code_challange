export default {
    searchedResults: [],
    selectedDestination: '',

    async performSearch(value = '') {
        const response = await fetch(`https://api.cloud.tui.com/search-destination/v2/de/package/TUICOM/2/autosuggest/peakwork/${value}`);
        const myJson = await response.json();

        const items = myJson[0] ? myJson[0].items : [];

        console.log(items);

        this.searchedResults = items;
    },

    getSearchedResults() {
        return this.searchedResults;
    },

    getSelectedDestination() {
        return this.selectedDestination;
    },

    setSelectedDestination(value) {
        this.selectedDestination = value;
    }
}