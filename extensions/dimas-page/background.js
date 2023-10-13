
chrome.contextMenus.remove('openDimaPage', function () {
    chrome.contextMenus.create({
        id: "openDimaPage",
        title: "Open Dima's Page",
        contexts: ["selection", "link"],
    });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "openDimaPage") {
        const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
        const url = `https://dmytro.web.cern.ch/dmytro/cmsprodmon/workflows.php?prep_id=${encodeURIComponent(selectedText)}`;
        chrome.tabs.create({ url: url });
    }
});

