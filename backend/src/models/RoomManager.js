const Room = require('./Room');

class RoomManager {
    constructor() {
        this.rooms = new Map();
    }

    getOrCreateRoom(roomId) {
        if (!this.rooms.has(roomId)) {
            this.rooms.set(roomId, new Room(roomId));
        }
        return this.rooms.get(roomId);
    }

    removeRoom(roomId) {
        this.rooms.delete(roomId);
    }

    getRoomInfo(roomId) {
        const room = this.rooms.get(roomId);
        return room ? { id: roomId, users: room.size() } : null;
    }

    getAllRoomsInfo() {
        const roomsInfo = [];
        this.rooms.forEach((room, roomId) => {
            roomsInfo.push({
                id: roomId,
                users: room.size()
            });
        });
        return roomsInfo;
    }
}

module.exports = RoomManager;
