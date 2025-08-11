import clamp from "./clamp.js";

export default function rotate(logger) {
    const root = document.documentElement;
    let prevSpeed = 200;
    let angle = 0;
    const coeff = 0.002;
    let start;
    // root.style.setProperty("--field-size", settings.size);
    const redraw = (timestamp) => {
        if (start === undefined) {
            start = timestamp;
        }
        const elapsed = timestamp - start;
        console.log(elapsed);
        angle = (angle + prevSpeed * coeff * elapsed) % 360;
        root.style.setProperty("--tfan-angle", angle+"deg");
        requestAnimationFrame(redraw);
        start = timestamp;
    };
    requestAnimationFrame(redraw);
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function(event) {
            const rotationRate = event.rotationRate;

            if (rotationRate) { // Check if rotationRate object exists
                const alpha = rotationRate.alpha; // Rotation rate around Z-axis (perpendicular to screen)
                const beta = rotationRate.beta; // Rotation rate around X-axis (front to back)
                const gamma = rotationRate.gamma; // Rotation rate around Y-axis (side to side)
                const positiveSpeed = Math.abs(alpha);

                prevSpeed = clamp(prevSpeed - 20, positiveSpeed, prevSpeed + 20);

                if (prevSpeed < 10) {
                    prevSpeed = 0;
                }

                logger.log(
                    `Rotation Rate - Alpha: ${alpha ? alpha.toFixed(2) : "N/A"} °/s, ` +
                    `Beta: ${beta ? beta.toFixed(2) : "N/A"} °/s, ` +
                    `Gamma: ${gamma ? gamma.toFixed(2) : "N/A"} °/s`);
            } else {
                logger.log("Rotation Rate data not available.");
            }
        });
    } else {
        logger.log( "Device Motion events not supported on this device.");
    }
}
