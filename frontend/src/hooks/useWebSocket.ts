import { useEffect, useRef, useState } from "react";
import { MessageData } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface UseWebSocketProps {
  roomId: string;
  username: string;
}

interface UseWebSocketReturn {
  messages: MessageData[];
  sendMessage: (message: Omit<MessageData, "status">) => void;
  onlineMembers: Array<{ id: string; username: string; lastActive: number }>;
  isConnected: boolean;
}

export function getWebSocketUrl(roomId: string) {
  // 1. 首先从 localStorage 中获取
  const wsUrlFromStorage = localStorage.getItem("WS_URL");
  if (wsUrlFromStorage) {
    return `${wsUrlFromStorage}/${roomId}`;
  }

  // 2. 从环境变量获取
  const wsUrlFromEnv = import.meta.env.VITE_WS_URL || process.env.VITE_WS_URL;
  if (wsUrlFromEnv) {
    return `${wsUrlFromEnv}/${roomId}`;
  }

  // 3. 最后才从 window.location 拼接
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/ws/${roomId}`;
}

export const useWebSocket = ({
  roomId,
  username,
}: UseWebSocketProps): UseWebSocketReturn => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineMembers, setOnlineMembers] = useState<
    Array<{ id: string; username: string; lastActive: number }>
  >([]);
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast(); // 将 useToast 移到组件顶层

  useEffect(() => {
    const ws = new WebSocket(getWebSocketUrl(roomId));
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      toast({
        title: "连接成功",
        description: "WebSocket 连接已建立",
        variant: "default",
      });
      // 发送加入消息
      ws.send(
        JSON.stringify({
          type: "join",
          user: username,
          timestamp: Date.now(),
        }),
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "ping") {
        ws.send(JSON.stringify({ type: "pong" }));
        return;
      }

      if (data.type === "members_update") {
        setOnlineMembers(data.members);
        return;
      }

      if (data.type === "message_status") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === data.messageId ? { ...msg, status: data.status } : msg,
          ),
        );
        return;
      }

      if (data.type === "system") {
        toast({
          title: "Notify",
          description: data.content,
          variant: "default",
        });
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          ...data,
          status: "sent",
          timestamp: Date.now(),
        },
      ]);
    };

    ws.onclose = () => {
      setIsConnected(false);
      toast({
        title: "连接断开",
        description: "WebSocket 连接已断开",
        variant: "destructive",
      });
    };

    return () => {
      ws.close();
    };
  }, [roomId, username, toast]); // 添加 toast 到依赖数组

  const sendMessage = (message: Omit<MessageData, "status">) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
      setMessages((prev) => [...prev, { ...message, status: "sent" }]);
    } else {
      toast({
        title: "发送失败",
        description: "WebSocket 连接已断开",
        variant: "destructive",
      });
    }
  };

  return {
    messages,
    sendMessage,
    onlineMembers,
    isConnected,
  };
};
