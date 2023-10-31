
chrome.runtime.onInstalled.addListener(async () =>{
    chrome.contextMenus.create({
        id: "openDASPage",
        title: "Open DAS Page",
        contexts: ["selection", "link"],
    });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "openDASPage") {
        const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
        const url = `https://cmsweb.cern.ch/das/request?view=list&limit=50&instance=prod%2Fglobal&input=${encodeURIComponent(selectedText)}`;
        chrome.tabs.create({ url: url });
    }
});

