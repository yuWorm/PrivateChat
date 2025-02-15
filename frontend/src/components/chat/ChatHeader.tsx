import React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme/ThemeToggle";
import { OnlineMembers } from "./OnlineMembers";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "@/i18n/LanguageSwitch.tsx";

interface ChatHeaderProps {
  roomId: string;
  onLogout: () => void;
  username: string;
  onlineMembers: Array<{ id: string; username: string; lastActive: number }>;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  roomId,
  onLogout,
  username,
  onlineMembers,
}) => {
  const { t } = useTranslation();
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">
            {t("common.room")}: {roomId}
          </h1>
          <OnlineMembers members={onlineMembers} currentUser={username} />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitch />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("common.settings")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                {t("common.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
