chrome.runtime.onInstalled.addListener(async () =>{
    chrome.contextMenus.create({
        id: "openUnifiedErrorReport",
        title: "Open Unified Error Report",
        contexts: ["selection", "link"],
    });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "openUnifiedErrorReport") {
        const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
        const url = `https://cms-unified.web.cern.ch/cms-unified/report/${encodeURIComponent(selectedText)}`;
        chrome.tabs.create({ url: url });
    }
});
chrome.runtime.onInstalled.addListener(async () =>{
    chrome.contextMenus.create({
        id: "openUnifiedLogs",
        title: "Open Unified Logs",
        contexts: ["selection", "link"],
    });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "openUnifiedLogs") {
        const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
        const url = `https://cms-unified.web.cern.ch/cms-unified/showlog/?search=${encodeURIComponent(selectedText)}`;
        chrome.tabs.create({ url: url });
    }
});
