const WebSocket = require('ws');
const config = require('../config');

class WebSocketService {
    constructor(roomManager) {
        this.roomManager = roomManager;
        this.wss = null;
    }

    initialize(server) {
        this.wss = new WebSocket.Server({ noServer: true });
        this.setupWebSocketServer();
        return this.wss;
    }

    setupWebSocketServer() {
        this.wss.on('connection', (ws, roomId) => {
            this.handleConnection(ws, roomId);
        });
    }

    handleConnection(ws, roomId) {
        console.log(`Client connected to room: ${roomId}`);
        
        // Initialize connection state
        ws.isAlive = true;
        ws.roomId = roomId;
        ws.lastActivity = Date.now();

        // Add to room
        const room = this.roomManager.getOrCreateRoom(roomId);
        room.addClient(ws);

        // Setup heartbeat
        const heartbeat = this.setupHeartbeat(ws);
        
        // Handle messages
        ws.on('message', (message) => this.handleMessage(ws, message));
        
        // Handle connection close
        ws.on('close', () => this.handleClose(ws));
        
        // Handle errors
        ws.on('error', (error) => this.handleError(ws, error));
        
        // Cleanup handler
        ws.on('cleanup', () => clearInterval(heartbeat));
    }

    setupHeartbeat(ws) {
        // Send initial heartbeat
        ws.send(JSON.stringify({ type: 'ping' }));

        return setInterval(() => {
            if (Date.now() - ws.lastActivity > config.heartbeat.timeout) {
                this.terminateConnection(ws);
                return;
            }

            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, config.heartbeat.interval);
    }

    handleMessage(ws, message) {
        try {
            const messageData = JSON.parse(message);

            if (messageData.type === 'pong') {
                ws.isAlive = true;
                ws.lastActivity = Date.now();
                return;
            }

            if (!this.isValidMessage(messageData)) {
                console.error('Invalid message format');
                return;
            }

            ws.lastActivity = Date.now();

            const room = this.roomManager.getOrCreateRoom(ws.roomId);
            room.broadcast(messageData, ws);
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }

    handleClose(ws) {
        this.cleanupConnection(ws);
    }

    handleError(ws, error) {
        console.error('WebSocket error:', error);
        this.terminateConnection(ws);
    }

    terminateConnection(ws) {
        ws.emit('cleanup');
        ws.terminate();
        this.cleanupConnection(ws);
    }

    cleanupConnection(ws) {
        if (ws.roomId) {
            const room = this.roomManager.getOrCreateRoom(ws.roomId);
            room.removeClient(ws);

            if (room.size() === 0) {
                this.roomManager.removeRoom(ws.roomId);
            }
        }
    }

    isValidMessage(message) {
        if (message.type === 'ping' || message.type === 'pong') {
            return true;
        }

        if (!message.type || !message.content || !message.user) {
            return false;
        }

        if (message.type === 'text') {
            return typeof message.content === 'string';
        } else if (message.type === 'image') {
            return typeof message.content === 'string';
        } else if (message.type.startsWith('file')) {
            return typeof message.content === 'string';
        }

        return false;
    }

    startHeartbeatCheck() {
        setInterval(() => {
            this.roomManager.rooms.forEach((room, roomId) => {
                room.clients.forEach((client) => {
                    if (Date.now() - client.lastActivity > config.heartbeat.timeout) {
                        console.log(`Removing inactive client from room ${roomId}`);
                        this.terminateConnection(client);
                    }
                });

                if (room.size() === 0) {
                    this.roomManager.removeRoom(roomId);
                }
            });
        }, config.heartbeat.interval);
    }
}

module.exports = WebSocketService;