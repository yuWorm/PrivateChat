const express = require('express');

function setupApiRoutes(roomManager) {
    const router = express.Router();

    // Get information about all rooms
    router.get('/rooms', (req, res) => {
        res.json(roomManager.getAllRoomsInfo());
    });

    // Get information about a specific room
    router.get('/rooms/:roomId', (req, res) => {
        const roomInfo = roomManager.getRoomInfo(req.params.roomId);
        if (roomInfo) {
            res.json(roomInfo);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    });

    // Health check endpoint
    router.get('/health', (req, res) => {
        res.json({ status: 'ok' });
    });

    return router;
}

module.exports = setupApiRoutes;