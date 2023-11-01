
chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "open campaign config",
        title: "Open Campaign Config",
        contexts: ["selection", "link"],
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "open campaign config") {
        const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
        const url = `https://cmsweb.cern.ch/reqmgr2/data/campaignconfig/${encodeURIComponent(selectedText)}`;
        chrome.tabs.create({ url: url });
    }
});
