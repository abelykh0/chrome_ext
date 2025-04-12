chrome.action.onClicked.addListener((tab) => {
    if (!tab.id) { return; }
    const tabId: number = tab.id;

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
    }, () => {
        chrome.tabs.sendMessage(tabId, { action: "doWork" });
    });
});

declare namespace SiebelApp {
    function CommandManager(): any;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "save") {
        if (!sender.tab?.id) { return; }

        chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        world: 'MAIN',
        func: () => {
            console.log('in save');

            // Save
            //const event = new KeyboardEvent('keydown', {
                //key: 's',
                //code: 'KeyS',
                //ctrlKey: true,
              //  bubbles: true,
             //   cancelable: true
            //});
            //document.dispatchEvent(event);
            //const saveButton = document.getElementById("ui-id-25");
            //if (saveButton) {
            //    saveButton.click();
           // }
            if (typeof SiebelApp !== 'undefined') {
                SiebelApp.CommandManager().ProcessAccelerator(new KeyboardEvent('keydown', { 'ctrlKey': true, 'key': 's' }),83);
            }

            // Click on breadcrumb
            setTimeout(() => {
                const threadBar = document.getElementById("siebui-threadbar");
                if (threadBar && threadBar.children.length > 0) {
                    let child = threadBar.children[0];
                    if (child && child.children.length > 0) {
                        child = child.children[0];
                        if (child && child.children.length > 0) {
                            const breadcrumb = child.children[0] as HTMLAnchorElement;
                            breadcrumb.click();
                        }
                    }
                }
                }, 500);

        },
        args: []
      });
    }
  });