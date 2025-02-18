# End-to-End Encrypted Chat Application

English | [中文](./README.md)

### Overview
This is an end-to-end encrypted chat application built with React and Express, utilizing AES encryption to ensure message security. The application supports real-time messaging, file sharing, and image transmission while maintaining privacy through encryption.

### Features
- End-to-end encryption using AES
- Real-time messaging
- Encrypted file sharing
- Encrypted image transmission
- Modern UI built with shadcn/ui components
- Responsive design for desktop and mobile devices

### Technology Stack
- Frontend:
  - React
  - shadcn/ui
  - WebSocket for real-time communication
  - AES encryption implementation
- Backend:
  - Express.js
  - WebSocket server
  - File handling system

### Usage from Source

```bash
# Clone
git clone https://github.com/yuWorm/PrivateChat.git
cd PrivateChat
# Install dependencies
pnpm run install
# Build frontend
pnpm build
# Start project
pnpm start
```

### Build with Docker
```bash
# Clone
git clone https://github.com/yuWorm/PrivateChat.git
cd PrivateChat

# Build image
docker build -t private_chat .
# Run
docker run --name private_chat --restart=always -p 3000:3000 private_chat:latest 
```

### Pull Image
```bash
docker pull yuWorm/private_chat

docker run --name private_chat --restart=always -p 3000:3000 private_chat:latest 
```

### Access
http://[yourip]:[your port, default 3000]

### Security
- All messages are encrypted using AES
- Secure key generation and exchange
- Files and images are encrypted before transmission
- No message content is stored in plain text

### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.