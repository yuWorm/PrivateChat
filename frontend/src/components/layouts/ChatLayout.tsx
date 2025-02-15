import React from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { useWebSocket } from "@/hooks/useWebSocket";
import { MessageData } from "@/types";

interface ChatLayoutProps {
  roomId: string;
  username: string;
  roomKey: string;
  onLogout: () => void;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  roomId,
  username,
  roomKey,
  onLogout,
}) => {
  const { messages, sendMessage, onlineMembers, isConnected } = useWebSocket({
    roomId,
    username,
  });

  const handleSendMessage = (messageData: Omit<MessageData, "user">) => {
    sendMessage({
      ...messageData,
      user: username,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader
        roomId={roomId}
        username={username}
        onlineMembers={onlineMembers}
        onLogout={onLogout}
      />
      <ChatMessages username={username} roomKey={roomKey} messages={messages} />
      <ChatInput
        onSendMessage={handleSendMessage}
        roomKey={roomKey}
        isConnected={isConnected}
      />
    </div>
  );
};
