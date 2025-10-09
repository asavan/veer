import settings from "./settings.js";
import rotate from "./rotate.js";
import motion from "./motion.js";

import {loggerFunc, parseSettings} from "netutils";

export default function starter(window, document) {
    parseSettings(window, document, settings);
    const logger = loggerFunc(document, settings);
    const rotator = rotate(document, logger);
    motion(window, document, logger, rotator.handleDeviceMotion);
}
