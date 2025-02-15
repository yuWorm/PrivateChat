import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Image as ImageIcon, Paperclip, Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChatInputProps, MessageType } from "@/types";
import { readFileAsBase64 } from "@/utils/fileHandlers";
import { encryptMessage } from "@/utils/crypto";
import { useTranslation } from "react-i18next";

const EMOJI_GROUPS = [
  ["😊", "😂", "🥰", "😍", "😒", "😭", "😩", "😤"],
  ["👍", "👎", "👌", "🤝", "👊", "✌️", "🤞", "🙏"],
  ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍"],
  ["🎉", "✨", "🌟", "💫", "⭐️", "🔥", "💯", "♥️"],
];

const EmojiPicker: React.FC<{ onSelect: (emoji: string) => void }> = ({
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-8 gap-1 p-2">
      {EMOJI_GROUPS.map((group, i) => (
        <React.Fragment key={i}>
          {group.map((emoji) => (
            <button
              key={emoji}
              className="hover:bg-muted p-1 rounded text-lg"
              onClick={() => onSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  roomKey,
}) => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [isImageMode, setIsImageMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const encryptedContent = encryptMessage(input, roomKey);
    onSendMessage({
      type: "text",
      content: encryptedContent,
      id: Date.now().toString(),
      timestamp: Date.now(),
      status: "sent",
    });
    setInput("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await readFileAsBase64(file);
      const type: MessageType = isImageMode
        ? "image"
        : `file/${file.type.split("/")[1] || "binary"}`;
      const encryptedContent = encryptMessage(base64, roomKey);

      onSendMessage({
        type,
        content: encryptedContent,
        id: Date.now().toString(),
        timestamp: Date.now(),
        status: "sent",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  return (
    <div className="border-t bg-background p-4">
      <form onSubmit={handleSendText} className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          accept={isImageMode ? "image/*" : undefined}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" type="button">
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start" side="top">
            <EmojiPicker
              onSelect={(emoji) => setInput((prev) => prev + emoji)}
            />
          </PopoverContent>
        </Popover>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsImageMode(false);
            fileInputRef.current?.click();
          }}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsImageMode(true);
            fileInputRef.current?.click();
          }}
        >
          <ImageIcon className="h-5 w-5" />
        </Button>

        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("common.inputMessage")}
          className="flex-1"
        />

        <Button type="submit" disabled={!input.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};
