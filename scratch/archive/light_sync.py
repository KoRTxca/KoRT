import paramiko
import os
from pathlib import Path

def sync_folder(local_path, remote_path):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')
    
    sftp = client.open_sftp()
    try:
        sftp.mkdir(remote_path)
    except:
        pass

    for root, dirs, files in os.walk(local_path):
        # Exclude bloat
        if any(x in root.lower() for x in ['node_modules', '.git', 'steam', 'movies', 'games']):
            continue
            
        relative_path = os.path.relpath(root, local_path)
        remote_root = os.path.join(remote_path, relative_path).replace('\\', '/')
        
        try:
            sftp.mkdir(remote_root)
        except:
            pass

        for file in files:
            local_file = os.path.join(root, file)
            remote_file = os.path.join(remote_root, file).replace('\\', '/')
            print(f"Syncing: {file}")
            sftp.put(local_file, remote_file)
            
    sftp.close()
    client.close()

if __name__ == "__main__":
    # Start with the smallest, most critical core
    sync_folder('d:\\KoRT_Command_Center\\Mission_Control', '/opt/kort/Mission_Control')
