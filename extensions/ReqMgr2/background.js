chrome.runtime.onInstalled.addListener(async () =>{
  chrome.contextMenus.create({
    id: "openReqMgr2",
    title: "Open ReqMgr2",
    contexts: ["selection"],
  });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "openReqMgr2") {
    const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
    const url = `https://cmsweb.cern.ch/reqmgr2/fetch?rid=${encodeURIComponent(selectedText)}`;
    chrome.tabs.create({ url: url });
  }
});

