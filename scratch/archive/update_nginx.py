import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('104.219.251.218', username='root', password='jetfg4GwdEaslMLH3DOWDgBU')

print("Modifying api.kortx.ca.conf on Xeon to use port 8081...")
client.exec_command("sed -i 's/127.0.0.1:8080/127.0.0.1:8081/g' /etc/nginx/sites-available/api.kortx.ca.conf")

print("Symlinking api.kortx.ca.conf to sites-enabled...")
client.exec_command("ln -sf /etc/nginx/sites-available/api.kortx.ca.conf /etc/nginx/sites-enabled/api.kortx.ca")

print("Testing Nginx configuration...")
stdin, stdout, stderr = client.exec_command("nginx -t")
print("Nginx -t stdout:", stdout.read().decode('utf-8'))
print("Nginx -t stderr:", stderr.read().decode('utf-8'))

print("Reloading Nginx...")
client.exec_command("systemctl reload nginx")

client.close()
print("Nginx config updated successfully!")
