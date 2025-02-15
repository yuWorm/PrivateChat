// src/types/index.ts
export type Theme = "light" | "dark" | "cyberpunk" | "matrix";

export type MessageType = "text" | "image" | `file/${string}` | "ping" | "pong";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface Message {
  type: MessageType;
  content: string;
  user: string;
}

export interface MessageData {
  id: string;
  type: MessageType;
  content: string;
  user: string;
  timestamp: number;
  status: "sent" | "delivered" | "read";
}

export interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  login: (data: UserData) => void;
  logout: () => void;
}

export interface UserData {
  roomId: string;
  username: string;
  roomKey: string;
}

export interface WebSocketContextType {
  messages: MessageData[];
  sendMessage: (message: MessageData) => void;
  onlineMembers: Array<{ id: string; username: string; lastActive: number }>;
  isConnected: boolean;
  ws: WebSocket | null;
}

// 组件 Props 类型
export interface LoginProps {
  onLogin: (data: UserData) => void;
}

export interface ChatLayoutProps {
  roomId: string;
  username: string;
  roomKey: string;
  onLogout: () => void;
}

export interface ChatHeaderProps {
  roomId: string;
  username: string;
  onlineMembers: Array<{ id: string; username: string; lastActive: number }>;
  onLogout: () => void;
}

export interface ChatInputProps {
  onSendMessage: (message: Omit<MessageData, "user">) => void;
  roomKey: string;
  isConnected: boolean;
}

export interface ChatMessagesProps {
  messages: MessageData[];
  username: string;
  roomKey: string;
}

export interface MessageProps {
  message: MessageData;
  currentUser: string;
  roomKey: string;
}

export interface ImagePreviewProps {
  src: string;
  onClose: () => void;
  filename?: string;
}

// Provider Props 类型
export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface WebSocketProviderProps {
  children: React.ReactNode;
  roomId: string;
}

// Hook返回类型
export interface UseMessagesReturn {
  messages: MessageData[];
  addMessage: (message: MessageData) => void;
}
