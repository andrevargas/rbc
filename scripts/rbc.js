const RBC = (() => {

    function simString(a, b) {
        return a.toLowerCase() === b.toLowerCase() ? 1 : 0;
    }

    function simNumber(a, b, { min, max }) {
        return 1 - Math.abs(b - a) / (max - min);
    }

    function getMinMax(valuesTable) {
        const values = Object.values(valuesTable);
        return {
            min: Math.min(...values),
            max: Math.max(...values)
        };
    }

    function getPriceRange(price) {
        if (price >= 0 && price <= 999) {
            return '0-999';
        } else if (price >= 1000 && price <= 1999) {
            return '1000-1999';
        } else if (price >= 2000 && price <= 2999) {
            return '2000-2999';
        } else if (price >= 3000) {
            return '3000';
        }
    }

    function simGlobal(newCase, storedCase) {

        const brandSim = simString(newCase.brand, storedCase.brand);
        const modelSim = simString(newCase.model, storedCase.model);
        const dualSimSim = simString(String(newCase.dualSim), String(storedCase.dualSim));

        const soSim = simNumber(
            SO_VALUES[newCase.so],
            SO_VALUES[storedCase.so],
            getMinMax(SO_VALUES)
        );

        const screenSizeSim = simNumber(
            SCREEN_SIZE_VALUES[newCase.screenSize],
            SCREEN_SIZE_VALUES[storedCase.screenSize],
            getMinMax(SCREEN_SIZE_VALUES)
        );

        const ramSim = simNumber(
            RAM_VALUES[newCase.ram],
            RAM_VALUES[storedCase.ram],
            getMinMax(RAM_VALUES)
        );

        const storageSim = simNumber(
            STORAGE_VALUES[newCase.storage],
            STORAGE_VALUES[storedCase.storage],
            getMinMax(STORAGE_VALUES)
        );

        const priceRangeSim = simNumber(
            PRICE_RANGE_VALUES[getPriceRange(newCase.price)],
            PRICE_RANGE_VALUES[getPriceRange(storedCase.price)],
            getMinMax(PRICE_RANGE_VALUES)
        );

        const totalWeight = Object.values(WEIGHTS).reduce((a, b) => a + b);

        const globalSim = ((WEIGHTS.brand * brandSim)
            + (WEIGHTS.model * modelSim)
            + (WEIGHTS.dualSim * dualSimSim)
            + (WEIGHTS.so * soSim)
            + (WEIGHTS.screenSize * screenSizeSim)
            + (WEIGHTS.ram * ramSim)
            + (WEIGHTS.storage * storageSim)
            + (WEIGHTS.priceRange * priceRangeSim)
        ) / totalWeight;

        return {
            id: storedCase.id,
            simValue: globalSim
        };

    }

    function testCase(newCase) {
        return database.map(storedCase =>
            simGlobal(newCase, storedCase)
        );
    }

    return {
        testCase
    };

})();