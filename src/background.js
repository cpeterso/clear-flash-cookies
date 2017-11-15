"use strict";

function removePluginData() {
    browser.browsingData.removePluginData({}).catch(error => {
        console.error(`removePluginData: ${error}`);
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
        error(`windows: ${error}`);
    });
});

// We don't have a chance to clear Flash cookies during browser shutdown, so
// we clear the previous browser session's Flash cookies during browser startup.
// Wait a couple seconds before clearing so we don't jank browser startup.
window.setTimeout(removePluginData, 3000);
