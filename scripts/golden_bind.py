import paramiko
import sys

def deploy_dns():
    host_ip = '104.219.251.218'
    host_user = 'root'
    host_pw = 'jetfg4GwdEaslMLH3DOWDgBU'

    print(f"Connecting to {host_ip}...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(host_ip, username=host_user, password=host_pw)

    print("Installing BIND9...")
    client.exec_command('apt-get update && apt-get install -y bind9 bind9utils')

    print("Configuring Zones...")
    client.exec_command('mkdir -p /etc/bind/zones')

    zone_content = """$TTL    604800
@       IN      SOA     ns1.kortx.ca. admin.kortx.ca. (
                              4         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      ns1.kortx.ca.
@       IN      NS      ns2.kortx.ca.
@       IN      A       104.219.251.218
ns1     IN      A       104.219.251.218
ns2     IN      A       104.219.251.218
www     IN      A       104.219.251.218
ide     IN      A       104.219.251.218
cloud   IN      A       10.10.10.35
"""
    # Write zone file using cat
    stdin, stdout, stderr = client.exec_command('cat > /etc/bind/zones/db.kortx.ca')
    stdin.write(zone_content)
    stdin.close()

    conf_local = """zone "kortx.ca" {
    type master;
    file "/etc/bind/zones/db.kortx.ca";
};
"""
    stdin, stdout, stderr = client.exec_command('cat > /etc/bind/named.conf.local')
    stdin.write(conf_local)
    stdin.close()

    print("Restarting BIND9...")
    client.exec_command('systemctl restart named')
    
    print("Verifying Service...")
    stdin, stdout, stderr = client.exec_command('systemctl status named')
    print(stdout.read().decode('utf-8'))

    client.close()
    print("Sovereign DNS Deployment Complete.")

if __name__ == "__main__":
    deploy_dns()
