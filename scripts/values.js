const SO_VALUES = {
    'Android': 0.1,
    'iOS': 1,
};

const SCREEN_SIZE_VALUES = {
    '5': 0.1,
    '5.5': 0.3,
    '5.7': 0.5,
    '5.8': 0.6,
    '5.15': 1
};

const RAM_VALUES = {
    '2': 0.1,
    '3': 0.2,
    '4': 0.3,
    '6': 0.5,
    '8': 0.7
};

const STORAGE_VALUES = {
    '16': 0.1,
    '32': 0.3,
    '64': 0.6,
    '128': 1,
    '256': 2
};

const PRICE_RANGE_VALUES = {
    '0-999': 1,
    '1000-1999': 2,
    '2000-2999': 3,
    '3000': 4 
};

const WEIGHTS = {
    brand: 3,
    model: 2,
    so: 4,
    screenSize: 2,
    ram: 3,
    storage: 3,
    dualSim: 1,
    priceRange: 4,
};
