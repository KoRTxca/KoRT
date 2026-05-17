import paramiko

host_ip = '66.55.78.96'
host_user = 'root'
host_pw = 'AntiGravity$$$GETerrDONE75'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    print(f"Connecting to Kamatera at {host_ip}...")
    client.connect(host_ip, username=host_user, password=host_pw, timeout=15)
    print("SUCCESS: Connected to Kamatera!")
    
    stdin, stdout, stderr = client.exec_command("uname -a && uptime")
    print("OUT:", stdout.read().decode('utf-8'))
    
except Exception as e:
    print("FAILED to connect to Kamatera:", e)
finally:
    client.close()
