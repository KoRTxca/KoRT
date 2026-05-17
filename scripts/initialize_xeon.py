import paramiko
import time
import sys

ip = '104.219.251.218'
user = 'root'
old_pass = 'bB6zTaLwutf05LbziI2R'
new_pass = 'jetfg4GwdEaslMLH3DOWDgBU'

def wait_and_read(chan, timeout=10):
    start_time = time.time()
    while not chan.recv_ready():
        time.sleep(0.2)
        if time.time() - start_time > timeout:
            return ""
    return chan.recv(8192).decode('utf-8', errors='ignore')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    print(f"Connecting to {ip} with temp password...")
    client.connect(ip, username=user, password=old_pass, timeout=15)
    
    shell = client.invoke_shell()
    
    output = wait_and_read(shell)
    print(f"BANNERS:\n{output}")

    # Check for forced change
    if "current" in output.lower() and "password" in output.lower():
        print(">>> Forced password change detected.")
        shell.send(old_pass + "\n")
        time.sleep(1)
        output = wait_and_read(shell)
        print(output)
        shell.send(new_pass + "\n")
        time.sleep(1)
        output = wait_and_read(shell)
        print(output)
        shell.send(new_pass + "\n")
        time.sleep(2)
        print(wait_and_read(shell))
    else:
        print(">>> No forced change. Running manual passwd...")
        shell.send("passwd\n")
        time.sleep(1.5)
        output = wait_and_read(shell)
        print(f"PASSWD OUTPUT: {output}")
        
        if "current" in output.lower():
            print("Sending current pass...")
            shell.send(old_pass + "\n")
            time.sleep(1)
            output = wait_and_read(shell)
            print(output)
        
        if "new password" in output.lower():
            print("Sending new pass...")
            shell.send(new_pass + "\n")
            time.sleep(1.5)
            output = wait_and_read(shell)
            print(output)
            
            if "retype" in output.lower() or "new password" in output.lower():
                print("Confirming new pass...")
                shell.send(new_pass + "\n")
                time.sleep(2)
                print(wait_and_read(shell))

    print(">>> Password change process finished. Closing connection.")
    client.close()

    time.sleep(3)

    print(f"Verifying access with password: {new_pass}")
    try:
        client.connect(ip, username=user, password=new_pass, timeout=15)
        print(">>> Verification SUCCESSFUL!")
    except Exception as e:
        print(f">>> Verification FAILED. Retrying with old password just in case...")
        client.connect(ip, username=user, password=old_pass, timeout=15)
        print(">>> Old password still works. Password change did not stick.")
        sys.exit(1)

    print(">>> Running system update and tools...")
    cmd = 'apt update -y && apt dist-upgrade -y && apt install -y curl wget git jq sudo ufw htop'
    stdin, stdout, stderr = client.exec_command(cmd)
    
    for line in stdout:
        print(line.strip())
    
    err_out = stderr.read().decode('utf-8')
    if err_out:
        print(f"STDERR:\n{err_out}")

    print(">>> Initialization complete. Server is ready.")
    client.close()

except Exception as e:
    print(f"FATAL ERROR: {e}")
    sys.exit(1)
