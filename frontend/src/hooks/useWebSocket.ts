import { useEffect, useRef, useState } from "react";
import { MessageData } from "@/types";

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

  useEffect(() => {
    const ws = new WebSocket(getWebSocketUrl(roomId));
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
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
    };

    return () => {
      ws.close();
    };
  }, [roomId, username]);

  const sendMessage = (message: Omit<MessageData, "status">) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
      setMessages((prev) => [...prev, { ...message, status: "sent" }]);
    }
  };

  return {
    messages,
    sendMessage,
    onlineMembers,
    isConnected,
  };
};
