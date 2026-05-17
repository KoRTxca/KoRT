import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Rewriting /etc/resolv.conf to use Cloudflare DNS...")
cmd = "echo -e 'nameserver 1.1.1.1\\nnameserver 1.0.0.1' > /etc/resolv.conf"
stdin, stdout, stderr = client.exec_command(cmd)

print("Verifying DNS resolution on Xeon...")
stdin, stdout, stderr = client.exec_command('curl -I -m 5 https://generativelanguage.googleapis.com/')
print("STDOUT:")
print(stdout.read().decode('utf-8'))
print("STDERR:")
print(stderr.read().decode('utf-8'))

client.close()
