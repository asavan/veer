export default function rotate(logger) {
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function(event) {
            const rotationRate = event.rotationRate;

            if (rotationRate) { // Check if rotationRate object exists
                const alpha = rotationRate.alpha; // Rotation rate around Z-axis (perpendicular to screen)
                const beta = rotationRate.beta; // Rotation rate around X-axis (front to back)
                const gamma = rotationRate.gamma; // Rotation rate around Y-axis (side to side)

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
