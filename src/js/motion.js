// In response to a user interaction, e.g., a button click
export default function motion(window, document, logger, handleDeviceMotion) {
    let tryPermission = false;
    if (!window.DeviceMotionEvent) {
        logger.log( "Device Motion events not supported on this device.");
        return;
    }
    if (typeof window.DeviceMotionEvent.requestPermission === "function") {
        document.querySelector(".content").addEventListener("scroll", async () => {
            if (tryPermission) return;
            try {
                const permissionState = await DeviceMotionEvent.requestPermission();
                if (permissionState === "granted") {
                    tryPermission = true;
                    logger.log("Device motion permission granted.");
                    // Start listening for device motion events
                    window.addEventListener("devicemotion", handleDeviceMotion);
                } else {
                    logger.log("Device motion permission denied.");
                }
            } catch (error) {
                logger.error("Error requesting device motion permission:", error);
            }
        });
    } else {
        logger.log("DeviceMotionEvent.requestPermission() is not supported in this browser.");
        // Proceed without explicit permission request if not needed or supported
        window.addEventListener("devicemotion", handleDeviceMotion);
    }
}
