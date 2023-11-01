import os
import argparse
import json
import shutil

def generate_extension_code(extension_name, base_url):
    """
    Generate Chrome extension code based on the provided extension name and base URL.
    
    Args:
    - extension_name (str): Name of the extension (also used as the context menu title).
    - base_url (str): Base URL to open with the selected text.
    
    Returns:
    - str: JavaScript code for the Chrome extension.
    """
    code = f"""
chrome.runtime.onInstalled.addListener(async () => {{
    chrome.contextMenus.create({{
        id: "{extension_name.lower()}",
        title: "{extension_name}",
        contexts: ["selection", "link"],
    }});
}});

chrome.contextMenus.onClicked.addListener(function (info, tab) {{
    if (info.menuItemId === "{extension_name.lower()}") {{
        const selectedText = info.selectionText.trim(); // Strip leading/trailing whitespace
        const url = `{base_url}${{encodeURIComponent(selectedText)}}`;
        chrome.tabs.create({{ url: url }});
    }}
}});
"""
    return code

def generate_manifest(extension_name, background_script="background.js", icon="icon.png"):
    """
    Generate manifest.json content for the Chrome extension.
    
    Args:
    - extension_name (str): Name of the extension.
    - background_script (str): Name of the background script file. Default is "background.js".
    - icon (str): Name of the icon file. Default is "icon.png".
    
    Returns:
    - dict: Content for manifest.json.
    """
    manifest_content = {
        "manifest_version": 3,
        "name": extension_name,
        "version": "1.0",
        "description": f"Open {extension_name} in a new tab with the selected text",
        "permissions": ["contextMenus", "activeTab", "storage"],
        "background": {
            "service_worker": background_script
        },
        "icons": {
            "48": icon
        },
        "host_permissions": ["http://*/*", "https://*/*"]
    }
    return manifest_content

def copy_icon(source_folder="WebOps", destination_folder=".", icon_name="icon.png"):
    """
    Copy the icon.png from the source folder to the destination folder.
    
    Args:
    - source_folder (str): Name of the source folder. Default is "ReqMgr2".
    - destination_folder (str): Name of the destination folder. Default is the current directory.
    - icon_name (str): Name of the icon file. Default is "icon.png".
    """
    shutil.copyfile(f"{source_folder}/{icon_name}", f"{destination_folder}/{icon_name}")


def main():
    parser = argparse.ArgumentParser(description="Generate Chrome extension code, manifest.json, and copy icon based on provided inputs.")
    parser.add_argument("extension_folder", help="Name of the folder where the extension files will be saved.")
    parser.add_argument("extension_name", help="Name of the extension (also used as the context menu title).")
    parser.add_argument("base_url", help="Base URL to open with the selected text (without the selected text part).")
    
    args = parser.parse_args()

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    extension_dir =  os.path.join(BASE_DIR, 'extensions', args.extension_folder)

    # Create the extension folder if it doesn't exist
    if not os.path.exists(extension_dir):
        os.makedirs(extension_dir)
    
    output_code = generate_extension_code(args.extension_name, args.base_url)
    with open(f"{extension_dir}/background.js", "w") as f:
        f.write(output_code)
    print("\nGenerated background.js in the specified extension folder.")
    
    manifest_content = generate_manifest(args.extension_name)
    with open(f"{extension_dir}/manifest.json", "w") as f:
        json.dump(manifest_content, f, indent=4)
    print("\nGenerated manifest.json in the specified extension folder.")
    
    copy_icon("WebOps", destination_folder=extension_dir)
    print(f"\nCopied icon.png from ReqMgr2 to the specified extension folder.")


if __name__ == "__main__":
    main()
