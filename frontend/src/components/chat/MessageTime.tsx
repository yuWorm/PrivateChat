import React from "react";
import { format } from "date-fns";

export const MessageTime: React.FC<{ timestamp: number }> = ({ timestamp }) => {
  return (
    <div className="text-xs text-muted-foreground text-center my-4">
      {format(timestamp, "yyyy-MM-dd HH:mm")}
    </div>
  );
};
