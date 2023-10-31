import json
import os
import shutil

def convert_chrome_to_firefox(chrome_dir, output_dir):
    # Load the manifest.json of the Chrome extension
    with open(os.path.join(chrome_dir, 'manifest.json'), 'r') as f:
        manifest = json.load(f)

    # Modify the manifest for Firefox if needed (for this example, we're just using MV2)
    if manifest.get('manifest_version') == 3:
        manifest['manifest_version'] = 2
        if 'background' in manifest and 'service_worker' in manifest['background']:
            manifest['background']['scripts'] = [manifest['background']['service_worker']]
            del manifest['background']['service_worker']

        # Move host_permissions to permissions for Firefox MV2 compatibility
        if 'host_permissions' in manifest:
            if 'permissions' in manifest:
                manifest['permissions'].extend(manifest['host_permissions'])
            else:
                manifest['permissions'] = manifest['host_permissions']
            del manifest['host_permissions']

    # Define the output directory for the Firefox extension
    firefox_dir_name = os.path.basename(chrome_dir) + '_firefox'
    firefox_dir = os.path.join(output_dir, firefox_dir_name)
    
    if not os.path.exists(firefox_dir):
        shutil.copytree(chrome_dir, firefox_dir)

    with open(os.path.join(firefox_dir, 'manifest.json'), 'w') as f:
        json.dump(manifest, f, indent=4)

    return firefox_dir



def compress_to_zip(directory):
    shutil.make_archive(directory, 'zip', directory)

if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    extensions_root_dir = f'{BASE_DIR}/extensions'  # Replace with your directory path

    # Define the output directory for the Firefox extensions
    firefox_output_dir = os.path.join(os.path.dirname(extensions_root_dir), 'firefox')
    if not os.path.exists(firefox_output_dir):
        os.makedirs(firefox_output_dir)

    # Iterate over each extension folder in the provided directory
    for extension_dir in os.listdir(extensions_root_dir):
        full_path = os.path.join(extensions_root_dir, extension_dir)
        
        # Check if it's a directory and contains a manifest.json (indicating it's an extension)
        if os.path.isdir(full_path) and 'manifest.json' in os.listdir(full_path):
            # Convert Chrome extension to Firefox extension
            firefox_extension_dir = convert_chrome_to_firefox(full_path, firefox_output_dir)

            # Compress directories to zip files
            compress_to_zip(full_path)
            compress_to_zip(firefox_extension_dir)

    print("Conversion and compression completed!")

