class Room {
    constructor(id) {
        this.id = id;
        this.clients = new Set();
    }

    addClient(ws) {
        this.clients.add(ws);
        this.broadcast({
            type: 'system',
            content: `New user joined. Current users: ${this.clients.size}`,
            user: 'System'
        });
    }

    removeClient(ws) {
        this.clients.delete(ws);
        this.broadcast({
            type: 'system',
            content: `User left. Current users: ${this.clients.size}`,
            user: 'System'
        });
    }

    broadcast(message, excludeWs = null) {
        this.clients.forEach(client => {
            if (client !== excludeWs && client.readyState === 1) {
                client.send(JSON.stringify(message));
            }
        });
    }

    size() {
        return this.clients.size;
    }
}

module.exports = Room;