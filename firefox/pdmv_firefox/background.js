chrome.runtime.onInstalled.addListener(async () =>{
  chrome.contextMenus.create({
    id: "opemPMP",
    title: "Open pMp",
    contexts: ["selection"],
  });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "opemPMP") {
    const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
    const url = `https://cms-pdmv-prod.web.cern.ch/pmp/historical?r=${encodeURIComponent(selectedText)}`;
    chrome.tabs.create({ url: url });
  }
});

