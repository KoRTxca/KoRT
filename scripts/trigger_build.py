import paramiko
import time
import sys

host_ip = '104.219.251.218'
host_user = 'root'
host_pw = 'jetfg4GwdEaslMLH3DOWDgBU'

print(f"[KoRT] Initiating SSH Uplink to {host_ip}...")
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    client.connect(host_ip, username=host_user, password=host_pw, timeout=10)
    print("[OK] Uplink Established. Forging VS_KoRT_Code...")
    
    # Send the bash script we created locally over to the server and execute it
    # For now, we will just start the build command and detach it
    
    # Read the local script
    with open("d:\\KoRT_Command_Center\\Mission_Control\\scripts\\build_vs_kort_code.sh", "r", encoding="utf-8") as f:
        script_content = f.read()
    
    # Write it to the remote server and make it executable, then run it in the background
    sftp = client.open_sftp()
    remote_script = '/opt/kort/scripts/build_vs_kort_code.sh'
    
    # Ensure directory exists
    client.exec_command('mkdir -p /opt/kort/scripts')
    
    with sftp.file(remote_script, 'w') as f:
        f.write(script_content)
        
    sftp.chmod(remote_script, 0o755)
    sftp.close()
    
    print("[RUN] Script injected. Launching the compilation process in the background via nohup...")
    stdin, stdout, stderr = client.exec_command(f'nohup {remote_script} > /opt/kort/scripts/build_vs_kort_code.log 2>&1 &')
    
    print("[SUCCESS] Build process launched successfully!")
    print("You can monitor the progress on the server by running: tail -f /opt/kort/scripts/build_vs_kort_code.log")
    
finally:
    client.close()
