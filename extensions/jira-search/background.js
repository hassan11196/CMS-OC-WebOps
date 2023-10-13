chrome.contextMenus.remove('openJira', function () {
    chrome.contextMenus.create({
        id: "openJira",
        title: "Open Jira",
        contexts: ["selection", "link"],
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "openJira") {
        const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
        const url = `https://its.cern.ch/jira/issues/?jql=text~${encodeURIComponent(selectedText)}%20AND%20(project%20%3D%20CMSPROD%20OR%20project%20%3D%20CMSCOMPPR)`;
        chrome.tabs.create({ url: url });
    }
});

