import settings from "./settings.js";
import loggerFunc from "./logger.js";
import rotate from "./rotate.js";
import motion from "./motion.js";

function stringToBoolean(string){
    switch (string.toLowerCase().trim()){
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(string);
    }
}

function parseSettings(window, document, settings) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams) {
        if (typeof settings[key] === "number") {
            settings[key] = parseInt(value, 10);
        } else if (typeof settings[key] === "boolean") {
            settings[key] = stringToBoolean(value);
        } else {
            settings[key] = value;
        }
    }
}

export default function starter(window, document) {
    parseSettings(window, document, settings);
    const logger = loggerFunc(document, settings);
    const rotator = rotate(document, logger);
    motion(window, document, logger, rotator.handleDeviceMotion);
}
