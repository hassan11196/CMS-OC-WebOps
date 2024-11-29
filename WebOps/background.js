// Define predefined shortcuts (without prefixes)
const predefinedShortcuts = [
  {
    id: "openDimaPage",
    title: "Open Dima's Page",
    url: "https://dmytro.web.cern.ch/dmytro/cmsprodmon/workflows.php?prep_id={text}"
  },
  {
    id: "openReqMgr2",
    title: "Open ReqMgr2",
    url: "https://cmsweb.cern.ch/reqmgr2/fetch?rid={text}"
  },
  {
    id: "openUnifiedErrorReport",
    title: "Open Unified Error Report",
    url: "https://cms-unified.web.cern.ch/cms-unified/report/{text}"
  },
  {
    id: "openUnifiedLogs",
    title: "Open Unified Logs",
    url: "https://cms-unified.web.cern.ch/cms-unified/showlog/?search={text}"
  },
  {
    id: "openMSPileup",
    title: "Open MS Pileup",
    url: "https://cmsweb.cern.ch/ms-pileup/data/pileup?pileupName={text}"
  },
  {
    id: "openMSTransferor",
    title: "Open MS Transferor",
    url: "https://cmsweb.cern.ch/ms-transferor/data/info?request={text}"
  },
  {
    id: "openJira",
    title: "Open Jira",
    url: "https://its.cern.ch/jira/issues/?jql=text~{text}%20AND%20(project%20%3D%20CMSPROD%20OR%20project%20%3D%20CMSCOMPPR)"
  },
  {
    id: "openPMP",
    title: "Open pMp",
    url: "https://cms-pdmv-prod.web.cern.ch/pmp/historical?r={text}"
  },
  {
    id: "openRucioWebUi",
    title: "Open Rucio Web Ui",
    url: "https://cms-rucio-webui.cern.ch/search?pattern=cms:{text}"
  }
];

// Function to load shortcuts and create context menus
function loadShortcuts() {
  // Clear all existing context menus first
  chrome.contextMenus.removeAll(() => {
    console.log("Existing context menus cleared.");

    // Fetch shortcuts from storage
    chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
      shortcuts = shortcuts || [];

      // Log the shortcuts to debug duplicate issues
      console.log("Loading shortcuts:", shortcuts);

      shortcuts.forEach(shortcut => {
        const menuId = `cms-web-ops-${shortcut.id}`; // Ensure unique ID
        console.log(`Creating context menu: ${menuId}`);

        try {
          chrome.contextMenus.create({
            id: menuId,
            title: shortcut.title,
            contexts: ["selection"], // Context menu available for selected text
          });
        } catch (error) {
          console.error(`Error creating context menu for ${menuId}:`, error);
        }
      });
    });
  });
}

// Listener for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
    const shortcut = shortcuts.find(s => `cms-web-ops-${s.id}` === info.menuItemId);
    if (shortcut) {
      const selectedText = info.selectionText
        ? encodeURIComponent(info.selectionText.trim())
        : "";
      const url = shortcut.url.replace("{text}", selectedText);
      chrome.tabs.create({ url });
    }
  });
});

// On extension installation, add predefined shortcuts if not already present
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
    if (!shortcuts || shortcuts.length === 0) {
      console.log("No shortcuts found. Adding predefined shortcuts.");

      // Save predefined shortcuts (without prefix)
      chrome.storage.sync.set({ shortcuts: predefinedShortcuts }, () => {
        console.log("Predefined shortcuts have been added.");
        loadShortcuts(); // Reload context menus
      });
    } else {
      console.log("Existing shortcuts detected. Skipping predefined shortcuts.");
      loadShortcuts(); // Load existing shortcuts
    }
  });
});

// Reload shortcuts dynamically if storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.shortcuts) {
    console.log("Shortcuts updated. Reloading context menus.");
    loadShortcuts();
  }
});

// Load shortcuts initially when the background script starts
loadShortcuts();
