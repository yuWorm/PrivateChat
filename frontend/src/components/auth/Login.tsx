import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginProps } from "@/types";
import { storage } from "@/utils/storage";
import { ThemeToggle } from "../theme/ThemeToggle";
import { LanguageSwitch } from "@/i18n/LanguageSwitch";

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t } = useTranslation();

  // 解析房间参数
  const urlParams = new URLSearchParams(window.location.search);
  const room = urlParams.get("room") ?? ""; // 'hello'

  const [roomId, setRoomId] = useState(room);
  const [username, setUsername] = useState(storage.getUsername() || "");
  const [roomKey, setRoomKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId && username && roomKey) {
      onLogin({ roomId, username, roomKey });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute top-4 right-4 flex gap-2">
        <LanguageSwitch />
        <ThemeToggle />
      </div>
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {t("auth.joinRoom")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("common.room")}</label>
              <Input
                required
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder={t("auth.enterRoom")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("common.username")}
              </label>
              <Input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("auth.enterUsername")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("common.roomKey")}
              </label>
              <Input
                required
                type="password"
                value={roomKey}
                onChange={(e) => setRoomKey(e.target.value)}
                placeholder={t("auth.enterRoomKey")}
              />
            </div>
            <Button type="submit" className="w-full">
              {t("common.join")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
