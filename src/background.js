"use strict";

function removePluginData() {
    const start = performance.now();

    function logDuration() {
        const end = performance.now();
        const duration = Math.ceil(end - start);
        console.log(`clear-flash-cookies: removePluginData took ${duration} ms`);
    }

    browser.browsingData.removePluginData({}).then(() => {
        logDuration();
    }).catch(error => {
        logDuration();
        console.error(`clear-flash-cookies: error! ${error}`);
    });
}

// Remove Flash cookies when all browser windows are closed. This code does
// not run on browser exit.
browser.windows.onRemoved.addListener(() => {
    browser.windows.getAll().then(windows => {
        if (windows.length === 0) {
            removePluginData();
        }
    }).catch(error => {
        console.error(`clear-flash-cookies: error! ${error}`);
    });
});

// We don't have a chance to clear Flash cookies during browser shutdown, so
// we clear the previous browser session's Flash cookies during browser startup.
// Wait a couple seconds before clearing so we don't jank browser startup.
window.setTimeout(removePluginData, 3000);
