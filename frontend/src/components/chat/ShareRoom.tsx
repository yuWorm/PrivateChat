import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Copy, Check } from "lucide-react";

export interface ShareRoomProps {
  roomId: string;
  username: string;
}

export const ShareRoom: React.FC<ShareRoomProps> = ({ roomId, username }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const inviteUrl = `${window.location.origin}/?room=${roomId}`;
  const inviteMessage = `${username} ${t("chat.inviteMessage")} ${inviteUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{t("chat.shareRoom")}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">{t("chat.shareRoom")}</CardTitle>
            <CardDescription>{t("chat.shareRoomDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-3 rounded-md break-all text-sm">
              {inviteMessage}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  {t("common.copied")}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t("common.copy")}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
