chrome.contextMenus.create({
    id: "openRucioWebUi",
    title: "Open Rucio Web Ui",
    contexts: ["selection"],
  });
  
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "openRucioWebUi") {
      const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
      const url = `https://cms-rucio-webui.cern.ch/search?pattern=cms:${encodeURIComponent(selectedText)}`;
      chrome.tabs.create({ url: url });
    }
  });
  
