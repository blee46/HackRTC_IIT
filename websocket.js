class WebSocketClient {
  constructor() {
    this.webSocket = null;
  }
  connect(url) {
    return new Promise((resolve, reject) => {
      this.webSocket = new WebSocket(url); // Correction here
      this.webSocket.onopen = () => {
        console.log("WebSocket connected");
        resolve();
      };
      this.webSocket.onclose = () => {
        console.log("WebSocket disconnected");
      };
      this.webSocket.onmessage = (event) => {
        console.log("Received message:", event.data);
        try {
          const response = JSON.parse(event.data);
        } catch (error) {
          reject(error);
        }
      };
      this.webSocket.onerror = (event) => {
        console.error("WebSocket error occurred:", event);
        reject(event);
      };
    });
  }
  disconnect() {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }
  sendMessage(message) {
    if (this.webSocket.readyState === WebSocket.OPEN) { // Check if websocket is open
      this.webSocket.send(JSON.stringify(message));
    } else {
      console.error("Connection not open");
    }
  }WebSocket

  registerAgencyAction(agencyID, agencySecret) {
    const requests = {
      action: "registerAgency",
      agencyIdentifier: agencyID,
      correlationId: "1171772563",
      secret: agencySecret,
      maintenanceMode: false,
    };

    this.sendMessage(requests);
  }

  subscribeToCall(registerToken) {
    const requests = {
      action: "subscribe",
      correlationId: "1647085767",
      registerToken: registerToken,
    };

    this.sendMessage(requests);
  }

  callAccepted(registerToken, callID) {
    const requests = {
      action: "acceptCall",
      correlationId: "11237085767",
      registerToken: registerToken,
      callId: callID,
    };

    this.sendMessage(requests);
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  const url = "wss://hackrtc.indigital.dev/text-control-api/v3";
  const username = "hackrtc-28";
  const password = "tzwIcR7g";
  const agencyID = "hackrtc-28";
  const agencySecret = "tzwIcR7g";

  window.webSocketClient = new WebSocketClient();
  window.webSocketClient.connect(url)
    .then(() => {
      console.log("Connected!");
      window.webSocketClient.registerAgencyAction(agencyID, agencySecret);
    })
    .catch((error) => {
      console.error("WebSocket connection error:", error);
    });
});
