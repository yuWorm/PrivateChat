
# 端对端加密聊天应用 | E2E Encrypted Chat Application

[English](./README.EN.md) | 中文

### 概述
这是一个使用 React 和 Express 构建的端对端加密聊天应用，使用 AES 加密确保消息安全。应用支持实时消息、文件共享和图片传输，同时通过加密保护隐私。

### 功能特点
- 使用 AES 的端对端加密
- 实时消息传输
- 加密文件共享
- 加密图片传输
- 使用 shadcn/ui 组件构建的现代化界面
- 支持桌面和移动设备的响应式设计

### 技术栈
- 前端：
  - React
  - shadcn/ui
  - WebSocket 实现实时通信
  - AES 加密实现
- 后端：
  - Express.js
  - WebSocket 服务器
  - 文件处理系统

### 从源码中使用

```bash
# 克隆
git clone https://github.com/yuWorm/PrivateChat.git
cd PrivateChat
# 安装依赖
pnpm run install
# 构建前端
pnpm build
# 启动项目
pnpm start
```

### 构建Docker
```bash
# 克隆
git clone https://github.com/yuWorm/PrivateChat.git
cd PrivateChat

# 构建镜像
docker build -t private_caht .
# 运行
docker run --name private_caht --restart=always -p 3000:3000 private_caht:latest 
```

### 拉取镜像
```bash
docker pull yuWorm/private_caht

docker run --name private_caht --restart=always -p 3000:3000 private_caht:latest 
```

### 访问
http://[yourip]:[your port, default 3000]

### 安全性
- 所有消息使用 AES 加密
- 安全的密钥生成和交换
- 文件和图片在传输前进行加密
- 不存储明文消息内容

### 贡献
欢迎提交贡献！请随时提交 Pull Request。