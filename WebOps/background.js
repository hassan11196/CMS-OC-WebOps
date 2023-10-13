
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

chrome.contextMenus.remove('openReqMgr2', function () {
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

chrome.contextMenus.remove('openUnifiedErrorReport', function () {
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
chrome.contextMenus.remove('openUnifiedLogs', function () {
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
});chrome.contextMenus.remove('openJira', function () {
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

chrome.contextMenus.remove('openPMP', function () {
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

chrome.contextMenus.remove('openRucioWebUi', function () {
  chrome.contextMenus.create({
    id: "openRucioWebUi",
    title: "Open Rucio Web Ui",
    contexts: ["selection"],
  });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "openRucioWebUi") {
    const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
    const url = `https://cms-rucio-webui.cern.ch/search?pattern=cms:${encodeURIComponent(selectedText)}`;
    chrome.tabs.create({ url: url });
  }
});

