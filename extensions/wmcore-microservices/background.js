chrome.contextMenus.remove('openMSPileup', function () {
  chrome.contextMenus.create({
    id: "openMSPileup",
    title: "Open MS Pileup",
    contexts: ["selection"],
  });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "openMSPileup") {
    const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
    const url = `https://cmsweb.cern.ch/ms-pileup/data/pileup?pileupName=${encodeURIComponent(selectedText)}`;
    chrome.tabs.create({ url: url });
  }
});

chrome.contextMenus.remove('openMSTransferor', function () {
  chrome.contextMenus.create({
    id: "openMSTransferor",
    title: "Open MS Transferor",
    contexts: ["selection"],
  });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "openMSTransferor") {
    const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
    const url = `https://cmsweb.cern.ch/ms-transferor/data/info?request=${encodeURIComponent(selectedText)}`;
    chrome.tabs.create({ url: url });
  }
});