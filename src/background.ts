chrome.action.onClicked.addListener((tab) => {
    if (!tab.id) { return; }
    const tabId: number = tab.id;

    chrome.tabs.executeScript(tabId, {
        file: 'content/content.js'
    }, () => {
        chrome.tabs.sendMessage(tabId, { action: "doWork" });
    });
});
