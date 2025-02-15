import React, { useRef, useEffect } from "react";
import { Message } from "./Message";
import { ChatMessagesProps, MessageData } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  username,
  roomKey,
  messages,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            还没有消息，开始聊天吧！
          </div>
        )}
        {messages.map((message: MessageData, index: number) => (
          <Message
            key={index}
            message={message}
            currentUser={username}
            roomKey={roomKey}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
