class MerlinOmniPresence {
  constructor() {
    if (MerlinOmniPresence.instance) {
      return MerlinOmniPresence.instance; // Singleton: Ensures only one Merlin is active
    }
    MerlinOmniPresence.instance = this;

    this.peerConnection = null;
    this.dataChannel = null;
    this.localAudioStream = null;
    this.screenStream = null;

    // Signaling server URL (Points to your self-hosted Xeon Node)
    this.signalingServer = "wss://api.kortx.ca/merlin-signal";
    this.ws = new WebSocket(this.signalingServer);

    this.initSignaling();
  }

  async initSignaling() {
    this.ws.onmessage = async (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'offer') await this.handleOffer(data.offer);
      if (data.type === 'answer') await this.handleAnswer(data.answer);
      if (data.type === 'candidate') await this.handleCandidate(data.candidate);
    };
  }

  async establishConnection() {
    console.log("🪄 [MERLIN] Initiating Omni-Presence WebRTC Link...");

    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }] // To be replaced with sovereign TURN server
    });

    try {
      // 1. Voice-to-Voice: Capture local mic
      this.localAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      this.localAudioStream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.localAudioStream));

      // 2. TeamViewer-style Screen Control: Capture screen & system audio
      this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      this.screenStream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.screenStream));
    } catch (err) {
      console.error("🛡️ [MERLIN SECURITY] Failed to acquire media permissions:", err);
    }

    // 3. Command & Control Data Channel (Full Stack Access)
    this.dataChannel = this.peerConnection.createDataChannel("merlin_control_protocol");
    this.dataChannel.onmessage = (event) => this.executeMerlinCommand(JSON.parse(event.data));

    // Handle incoming Merlin 3D Avatar Video/Audio payload
    this.peerConnection.ontrack = (event) => {
      const merlinVideoElement = document.getElementById('merlin-3d-overlay');
      if (merlinVideoElement) {
         merlinVideoElement.srcObject = event.streams[0];
      }
    };

    // Create Offer
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.ws.send(JSON.stringify({ type: 'offer', offer: offer }));
  }

  executeMerlinCommand(commandPayload) {
    console.log("🐉 [MERLIN OMNI-COMMAND] Executing payload:", commandPayload);
    // Secure Command Routing for executing system-level changes, API calls, and IDE edits
    switch(commandPayload.action) {
      case "EXECUTE_API":
        // Route to local api execution engine
        break;
      case "IDE_EDIT":
        // Hook into VSCode extension APIs for live-mode coding
        break;
      case "SYSTEM_OVERRIDE":
        // Engage high-level access based on Sovereign command
        break;
      default:
        console.warn("⚠️ [MORDRED FLAG] Unrecognized Omni-Command:", commandPayload.action);
    }
  }

  async handleOffer(offer) {
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    this.ws.send(JSON.stringify({ type: 'answer', answer: answer }));
  }

  async handleAnswer(answer) {
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  async handleCandidate(candidate) {
    await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }
}

// Initialize the Omni-Presence
const Merlin = new MerlinOmniPresence();
