const User = (() => {

    const recentSearches = {};

    function addSearch(key, value) {
        recentSearches[key] = value;
    }

    function getSearches() {
        return recentSearches;
    }

    return {
        getSearches,
        addSearch
    };

})();