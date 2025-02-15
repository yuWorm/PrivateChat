import React from "react";

export const TypingIndicator: React.FC<{ username: string }> = ({
  username,
}) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground p-2">
      <span>{username} 正在输入</span>
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
