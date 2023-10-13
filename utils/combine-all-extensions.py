import os
import json
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Directory containing the extensions
extensions_directory = os.path.join(BASE_DIR, 'extensions')

# Create a new manifest.json for the combined extension
combined_manifest = {
    "manifest_version": 3,
    "name": "CMS-OC-WebOps",
    "version": "1.0",
    "description": "Extensions for Chrome for CMS Offline and Computing.",
    "permissions": ["contextMenus", "activeTab", "storage"],
    "background": {
        "service_worker": "background.js"
    },
    "icons": {
        "48": "icon.png"
    },
    "host_permissions": ["http://*/*", "https://*/*"],
    "commands": {},
}
combined_background_code = ''

# Iterate through each extension folder
for extension_folder in os.listdir(extensions_directory):
    extension_path = os.path.join(extensions_directory, extension_folder)

    # Read the manifest.json of the current extension
    with open(os.path.join(extension_path, 'manifest.json'), 'r') as manifest_file:
        manifest_data = json.load(manifest_file)

    # Merge permissions from the current extension into the combined manifest
    combined_manifest["permissions"] += manifest_data.get("permissions", [])
    combined_manifest["host_permissions"] += manifest_data.get("host_permissions", [])

    # Merge commands from the current extension into the combined manifest
    combined_manifest["commands"].update(manifest_data.get("commands", {}))

    # Concatenate the code from the background.js file of the current extension
    with open(os.path.join(extension_path, 'background.js'), 'r') as background_file:
        combined_background_code += background_file.read()

combined_manifest["host_permissions"] = list(set(combined_manifest["host_permissions"]))
combined_manifest["permissions"] = list(set(combined_manifest["permissions"]))
# Write the combined manifest.json to the new extension folder
combined_extension_directory = os.path.join(BASE_DIR, 'WebOps')
os.makedirs(combined_extension_directory, exist_ok=True)
with open(os.path.join(combined_extension_directory, 'manifest.json'), 'w') as combined_manifest_file:
    json.dump(combined_manifest, combined_manifest_file, indent=4)

with open(os.path.join(combined_extension_directory, 'background.js'), 'w') as combined_background_file:
    combined_background_file.write(combined_background_code)

# Copy the icon.png from one of the extensions to the new extension folder
# You may choose an icon from one of the extensions or provide your own
icon_source_path = os.path.join(extensions_directory, 'extension_folder_with_icon', 'icon.png')
icon_destination_path = os.path.join(combined_extension_directory, 'icon.png')
if os.path.exists(icon_source_path):
    shutil.copy(icon_source_path, icon_destination_path)
