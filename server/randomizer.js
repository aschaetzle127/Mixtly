const seedData = require("../seed.json");

let rand = n => Math.floor(Math.random() * n);

const randomizer = option => {
    const randomBase = function(obj) {
        let keys = Object.keys(obj);
        return obj[keys[(keys.length * Math.random()) << 0]];
    };

    if (!option) {
        option = randomBase(seedData);
    } else {
        option = seedData[option + "-options"];
    }

    let preset = "";
    let flavors = [];

    if (rand(100) < 33) {
        let randomPreset = option.presets[rand(option.presets.length)];
        preset = randomPreset.name;
        flavors = randomPreset.flavor.split(", ");
    } else {
        let flavorCount = rand(2) + 1;
        for (let n = 0; n < flavorCount; n++) {
            flavors.push(option.flavors[rand(option.flavors.length)]);
        }
        flavors = new Array(...new Set(flavors));
    }

    return {
        base: option.base,
        flavors: flavors,
        preset: preset,
        milk: randomBase(option.milk),
        variation: randomBase(option.variation),
    };
};

module.exports = randomizer;
