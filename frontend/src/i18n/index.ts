import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 中文翻译
const zhCN = {
  common: {
    send: "发送",
    copy: "复制",
    copied: "复制成功",
    logout: "退出",
    room: "房间",
    username: "用户名",
    roomKey: "房间密钥",
    join: "加入房间",
    online: "在线",
    settings: "设置",
    download: "下载",
    uploadImage: "上传图片",
    uploadFile: "上传文件",
    inputMessage: "输入消息...",
    decryptFailed: "解密失败",
    emptyMessage: "还没有消息，开始聊天吧！",
  },
  theme: {
    light: "亮色",
    dark: "暗色",
    cyberpunk: "赛博朋克",
    matrix: "矩阵",
    toggleTheme: "切换主题",
  },
  auth: {
    joinRoom: "加入聊天室",
    enterRoom: "输入房间号",
    enterUsername: "输入用户名",
    enterRoomKey: "输入房间密钥",
  },
  chat: {
    onlineMembers: "在线成员",
    you: "你",
    typing: "正在输入...",
    messageNotSent: "消息未发送",
    messageDelivered: "已发送",
    messageRead: "已读",
    shareRoom: "分享聊天",
    shareRoomDescription: "你可以将此房间邀请复制发送给你的朋友",
    inviteMessage: "邀请你加入聊天室",
  },
  errors: {
    connectionLost: "连接已断开",
    reconnecting: "正在重连...",
    fileTooBig: "文件太大",
    uploadFailed: "上传失败",
  },
};

// 英文翻译
const enUS = {
  common: {
    send: "Send",
    logout: "Logout",
    copy: "Copy",
    copied: "Copied",
    room: "Room",
    username: "Username",
    roomKey: "Room Key",
    join: "Join Room",
    online: "Online",
    settings: "Settings",
    download: "Download",
    uploadImage: "Upload Image",
    uploadFile: "Upload File",
    inputMessage: "Type a message...",
    decryptFailed: "Decryption failed",
    emptyMessage: "No messages yet, start chatting!",
  },
  theme: {
    light: "Light",
    dark: "Dark",
    cyberpunk: "Cyberpunk",
    matrix: "Matrix",
    toggleTheme: "Toggle theme",
  },
  auth: {
    joinRoom: "Join Chat Room",
    enterRoom: "Enter room ID",
    enterUsername: "Enter username",
    enterRoomKey: "Enter room key",
  },
  chat: {
    onlineMembers: "Online Members",
    you: "You",
    typing: "typing...",
    messageNotSent: "Not sent",
    messageDelivered: "Delivered",
    messageRead: "Read",
    shareRoom: "Share Room",
    shareRoomDescription:
      "You can copy this room invitation and send it to your friends",
    inviteMessage: "Invite you to join the chat room",
  },
  errors: {
    connectionLost: "Connection lost",
    reconnecting: "Reconnecting...",
    fileTooBig: "File is too large",
    uploadFailed: "Upload failed",
  },
};

// 初始化 i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      "zh-CN": { translation: zhCN },
      "en-US": { translation: enUS },
    },
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
