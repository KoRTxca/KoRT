import paramiko
import select
import socket
import socketserver
import threading

# Xeon Host details
host_ip = '104.219.251.218'
host_user = 'root'
host_pw = 'jetfg4GwdEaslMLH3DOWDgBU'

# VM details
vm_ip = '10.10.10.35'
vm_port = 8443

class ForwardHandler(socketserver.BaseRequestHandler):
    def handle(self):
        try:
            chan = self.ssh_transport.open_channel(
                'direct-tcpip',
                (vm_ip, vm_port),
                self.request.getpeername()
            )
        except Exception as e:
            print(f"Incoming connection to {vm_ip}:{vm_port} failed: {e}")
            return
        if chan is None:
            print(f"Incoming connection to {vm_ip}:{vm_port} was rejected.")
            return

        print(f"Connected! Tunneling {self.request.getpeername()} -> {vm_ip}:{vm_port}")
        while True:
            r, w, x = select.select([self.request, chan], [], [])
            if self.request in r:
                data = self.request.recv(1024)
                if len(data) == 0:
                    break
                chan.send(data)
            if chan in r:
                data = chan.recv(1024)
                if len(data) == 0:
                    break
                self.request.send(data)
        chan.close()
        self.request.close()
        print(f"Tunnel closed for {self.request.getpeername()}")

def start_bridge():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting to KoRT Bridge Node ({host_ip})...")
    client.connect(host_ip, username=host_user, password=host_pw)
    
    class SubHandler(ForwardHandler):
        ssh_transport = client.get_transport()

    class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
        daemon_threads = True
        allow_reuse_address = True

    server = ThreadedTCPServer(('127.0.0.1', 8443), SubHandler)
    print("BRIDGE ACTIVE: Access your IDE at http://localhost:8443")
    server.serve_forever()

if __name__ == "__main__":
    start_bridge()
