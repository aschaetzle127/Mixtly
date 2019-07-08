const dutchBrosData = require("../../../seed.json");
const randomizer = require("../../randomizer.js");

module.exports = {
    allOptions(parent, args, context) {
        return Object.values(dutchBrosData);
    },
    option(parent, args, context) {
        const { base } = args;
        const baseData = dutchBrosData[base.toLowerCase() + "-options"];
        return baseData;
    },
    randomizedOption(parent, args, context) {
        // TODO: Return generated randomized option
        return randomizer(args.base && args.base.toLowerCase());
    },
};
