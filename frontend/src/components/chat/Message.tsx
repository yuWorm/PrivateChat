import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCheck } from "lucide-react";
import { MessageProps } from "@/types";
import { ImagePreview } from "./ImagePreview";
import { decryptMessage } from "@/utils/crypto";
import { format } from "date-fns";

export const Message: React.FC<MessageProps> = ({
  message,
  currentUser,
  roomKey,
}) => {
  const [showImagePreview, setShowImagePreview] = useState(false);
  const decryptedContent = decryptMessage(message.content, roomKey);
  const isCurrentUser = message.user === currentUser;

  const renderContent = () => {
    if (!decryptedContent) return <div className="text-red-500">解密失败</div>;

    if (message.type === "text") {
      return (
        <p className="break-words whitespace-pre-wrap">{decryptedContent}</p>
      );
    }

    if (message.type === "image") {
      return (
        <>
          <img
            src={decryptedContent}
            alt="图片消息"
            className="max-w-xs max-h-48 cursor-pointer rounded-lg object-cover"
            style={{ width: "100%", height: "auto" }}
            onClick={() => setShowImagePreview(true)}
          />
          {showImagePreview && (
            <ImagePreview
              src={decryptedContent}
              onClose={() => setShowImagePreview(false)}
              filename={`image_${Date.now()}`}
            />
          )}
        </>
      );
    }

    if (message.type.startsWith("file")) {
      return (
        <div className="flex items-center space-x-2 bg-black/10 rounded-lg p-2">
          <FileText className="h-5 w-5" />
          <a
            href={decryptedContent}
            download={`file_${Date.now()}.${message.type.split("/")[1]}`}
            className="text-blue-500 hover:underline"
          >
            下载文件
          </a>
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isCurrentUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} mb-4`}
    >
      <div
        className={`flex items-end gap-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
          <span className="text-sm font-semibold text-white">
            {message.user.charAt(0).toUpperCase()}
          </span>
        </div>
        <div
          className={`
            relative max-w-[80%] rounded-2xl px-4 py-2
            ${
              isCurrentUser
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-muted text-foreground rounded-bl-none"
            }
          `}
        >
          {!isCurrentUser && (
            <div className="text-sm font-medium mb-1 opacity-70">
              {message.user}
            </div>
          )}
          {renderContent()}
          <div
            className={`flex items-center gap-1 mt-1 text-xs opacity-70 ${isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            <span>{format(message.timestamp || Date.now(), "HH:mm")}</span>
            {isCurrentUser && <CheckCheck className="w-4 h-4" />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
