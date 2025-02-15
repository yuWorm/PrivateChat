import React, { useState, useRef, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast.ts";

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
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [isImageMode, setIsImageMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 设置渲染后触发，不然会出现还没切换文件类型就大开了上传框的问题
  const [fileInputClick, setFileInputClick] = useState(false);
  useEffect(() => {
    if (fileInputClick) {
      fileInputRef.current?.click();
      setFileInputClick(false);
    }
  }, [fileInputClick]);

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
    const file = e.target.files?.[0] as File;
    if (!file) return;

    // 文件大小限制（转换为 MB）先写死，后面加配置修改
    const fileSizeInMB = file.size / (1024 * 1024);
    const maxSizeInMB = isImageMode ? 5 : 8;

    if (fileSizeInMB > maxSizeInMB) {
      // 可以替换为你的提示组件，比如 Toast
      toast({
        title: "Error",
        description: `The file size cannot exceed ${maxSizeInMB}MB`,
        variant: "destructive",
        duration: 1000,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    try {
      const base64 = await readFileAsBase64(file);
      const type: MessageType = isImageMode
        ? "image"
        : `file/${file.name || "binary"}`;
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
          accept={isImageMode ? "image/*" : "*/*"}
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
            console.error(isImageMode);
            setFileInputClick(true);
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
            setFileInputClick(true);
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
