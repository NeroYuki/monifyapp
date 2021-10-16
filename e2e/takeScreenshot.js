const { execSync } = require("child_process");
const SCREENSHOT_OPTIONS = {
    timeout: 10000,
    killSignal: "SIGKILL",
};

export const takeScreenshot = (fileName) => {
    if (device.getPlatform() === "android") {
        const fileAddress = `/sdcard/${fileName}`;
        execSync(`adb shell screencap ${fileAddress}`, SCREENSHOT_OPTIONS);
        execSync(
            `adb pull ${fileAddress} screenshots/${fileName}`,
            SCREENSHOT_OPTIONS,
    );
    } else {
        const fileAddress = `$(pwd)/ios/screenshots/${fileName}`;
        execSync(
            `xcrun simctl io booted screenshot ${fileAddress}`,
            SCREENSHOT_OPTIONS,
    );
    }
};