import paramiko
import time

ip = '104.219.251.218'
user = 'root'
pw = 'jetfg4GwdEaslMLH3DOWDgBU'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(ip, username=user, password=pw)

# The command to type
command = "sudo apt update && sudo apt install -y openssh-server curl git\n"

print(f"Typing command into VM 133 console: {command}")

# Proxmox qm monitor sendkey uses keynames. A simpler way is to use 'qm terminal' if available,
# but 'qm monitor' with 'sendkey' is the standard way to 'type'.
# However, sending strings char by char via SSH is slow and complex with keynames.
# I will try to use the 'expect' style if possible, or just send a series of 'qm sendkey' commands.

def send_string(vmid, s):
    for char in s:
        key = char
        if char == ' ': key = 'spc'
        elif char == '\n': key = 'ret'
        elif char == '&': key = 'shift-7'
        elif char == '-': key = 'minus'
        elif char == '=': key = 'equal'
        elif char == '.': key = 'dot'
        elif char == '/': key = 'slash'
        elif char == ':': key = 'shift-dot'
        elif char == '_': key = 'shift-minus'
        # ... this is becoming complex. 
        # I'll use a simpler trick: use 'qm monitor' and 'type' command if version supports it.
        # Actually, most PVE versions don't have 'type'.
        
        # Let's use a one-liner on the host to do this more efficiently.
        pass

# NEW PLAN: Use a bash loop on the host to send keys.
bash_script = """
vmid=133
cmd="sudo apt update && sudo apt install -y openssh-server curl git"
for (( i=0; i<${#cmd}; i++ )); do
  char="${cmd:$i:1}"
  key="$char"
  case "$char" in
    " ") key="spc" ;;
    "&") key="shift-7" ;;
    "-") key="minus" ;;
    ".") key="dot" ;;
    "/") key="slash" ;;
    "|") key="shift-backslash" ;;
  esac
  qm sendkey $vmid $key
  sleep 0.05
done
qm sendkey $vmid ret
"""

stdin, stdout, stderr = client.exec_command(bash_script)
print(stdout.read().decode('utf-8'))
print(stderr.read().decode('utf-8'))

client.close()
