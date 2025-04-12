const PromotionNameBoxName = 's_5_1_103_0';
const DescriptionBoxName = 's_5_1_42_0';

chrome.runtime.onMessage.addListener(
    (message: { action: string }, sender, sendResponse) => {
      if (message.action === "doWork") {
        console.log("Received init message from background script");
        
        doWork();
      }
      
      // Return true if you want to use sendResponse asynchronously
      return true;
    }
  );

declare namespace SiebelApp {
    function CommandManager(): any;
}

function extractACodeMatches(input: string): string[] {
    const regex = /(?:^|[\s\r\n]+)(A\d{6})(?=[\s\r\n]+|$)/g;
    return Array.from(input.matchAll(regex), (match) => match[1]);
}

function doWork(): void {
    console.log('in doWork');

    const promotionNameBox = document.getElementsByName(PromotionNameBoxName)[0] as HTMLInputElement;
    const promotionName = promotionNameBox.value;
    if (extractACodeMatches(promotionName).length > 0) {
        return;
    }

    const descriptionBox = document.getElementsByName(DescriptionBoxName)[0] as HTMLInputElement;
    const matches = extractACodeMatches(descriptionBox.value);

    if (matches.length > 0) {
        promotionNameBox.value = promotionName.trimEnd() + ' ' + matches.join(' ');
        if (typeof SiebelApp !== 'undefined') {
            // Ctrl+S - save
            SiebelApp.CommandManager().ProcessAccelerator(
                new KeyboardEvent('keydown', { 'ctrlKey': true, 'key': 's' }),
                83
            );
        }
    }

    // Go to previous page - click on link
    
}
