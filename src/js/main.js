import rotate from "./rotate.js";
import motion from "./motion.js";

export default function starter(window, document) {
    const rotator = rotate(document, console);
    motion(window, document, console, rotator.handleDeviceMotion);
}
