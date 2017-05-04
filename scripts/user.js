const User = (() => {

    const lastPurchaseInfo = {
        so: 'Android',
        price: 2000,
        ram: 4,
        storage: 128
    };

    let lastSearch = {
        criteria: null,
        results: []
    };

    function setLastSearch(criteria, results) {
        lastSearch = { criteria, results };
    }

    function getLastSearch() {
        return lastSearch;
    }

    function getLastPurchaseInfo() {
        return lastPurchaseInfo;
    }

    return {
        getLastSearch,
        getLastPurchaseInfo,
        setLastSearch
    };

})();