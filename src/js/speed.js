export default function speed(logger) {
    let lastTime = 0;
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let speedX = 0;
    let speedY = 0;
    let speedZ = 0;

    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", (event) => {
            const acceleration = event.accelerationIncludingGravity;
            const currentTime = Date.now();

            if (lastTime > 0) {
                const deltaTime = (currentTime - lastTime) / 1000; // В секундах
                speedX = (acceleration.x - lastX) / deltaTime;
                speedY = (acceleration.y - lastY) / deltaTime;
                speedZ = (acceleration.z - lastZ) / deltaTime;

                const xStr = Math.abs(speedX).toFixed(2);
                const yStr = Math.abs(speedY).toFixed(2);
                const zStr = Math.abs(speedZ).toFixed(2);
                // Можно использовать speedX, speedY, speedZ для отображения или дальнейшей обработки
                logger.log({"X:": xStr, "Y:": yStr, "Z:": zStr});
            }

            lastTime = currentTime;
            lastX = acceleration.x;
            lastY = acceleration.y;
            lastZ = acceleration.z;

        });
    } else {
        logger.log("DeviceMotionEvent не поддерживается");
    }
}
