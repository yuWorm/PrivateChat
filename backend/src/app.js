const express = require('express');
const morgan = require('morgan');
const http = require('http');
const url = require('url');
const path = require('path');
const config = require('./config');
const RoomManager = require('./models/RoomManager');
const WebSocketService = require('./services/WebSocketService');
const setupApiRoutes = require('./routes/api');

class App {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.roomManager = new RoomManager();
        this.wsService = new WebSocketService(this.roomManager);
    }

    initialize() {
        // Middleware
        this.app.use(morgan('dev'));
        
        // Static files
        this.app.use(express.static(path.join(__dirname, '../dist')));
        
        // API routes
        this.app.use('/api', setupApiRoutes(this.roomManager));

        // WebSocket setup
        const wss = this.wsService.initialize(this.server);

        // WebSocket upgrade handling
        this.server.on('upgrade', (request, socket, head) => {
            const pathname = url.parse(request.url).pathname;
            const roomMatch = pathname.match(/^\/ws\/(\w+)$/);

            if (!roomMatch) {
                socket.destroy();
                return;
            }

            const roomId = roomMatch[1];

            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, roomId);
            });
        });

        // Start heartbeat checker
        this.wsService.startHeartbeatCheck();
    }

    start() {
        this.server.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    }
}

module.exports = App;
