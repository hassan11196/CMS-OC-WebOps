const shortcutsContainer = document.getElementById("shortcuts");
const addShortcutButton = document.getElementById("addShortcut");
const saveButton = document.getElementById("saveShortcuts");

// Load shortcuts from storage on page load
chrome.storage.sync.get("shortcuts", ({ shortcuts }) => {
    shortcuts = shortcuts || [];
    shortcuts.forEach(addShortcutRow);
});

// Add a shortcut card to the UI
function addShortcutRow({ id = "", title = "", url = "" } = {}) {
    const col = document.createElement("div");
    col.className = "col-md-6";

    col.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Shortcut</h5>
                <div class="mb-3">
                    <label class="form-label">ID</label>
                    <input type="text" class="form-control shortcut-id" value="${id}" placeholder="Enter unique ID">
                </div>
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control shortcut-title" value="${title}" placeholder="Enter shortcut title">
                </div>
                <div class="mb-3">
                    <label class="form-label">URL</label>
                    <input type="text" class="form-control shortcut-url" value="${url}" placeholder="Enter URL (use {text})">
                </div>
                <button class="btn btn-danger btn-sm deleteShortcut">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </div>
        </div>
    `;

    // Attach delete functionality
    col.querySelector(".deleteShortcut").onclick = () => {
        col.remove(); // Remove the shortcut from the DOM
        updateStorage(); // Update storage after deletion
    };

    shortcutsContainer.appendChild(col);
}

// Add a new blank shortcut row
addShortcutButton.onclick = () => addShortcutRow();

// Save all shortcuts to storage
saveButton.onclick = () => {
    updateStorage();
    showToast("Shortcuts saved successfully!", "success");
};

// Update storage with current shortcuts in the DOM
function updateStorage() {
    const shortcuts = Array.from(shortcutsContainer.children).map(col => {
        return {
            id: col.querySelector(".shortcut-id").value.trim(),
            title: col.querySelector(".shortcut-title").value.trim(),
            url: col.querySelector(".shortcut-url").value.trim(),
        };
    });

    chrome.storage.sync.set({ shortcuts });
}

// Utility: Show toast messages
function showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-bg-${type} border-0`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    document.body.appendChild(toast);
    const bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();

    setTimeout(() => toast.remove(), 3000);
}
