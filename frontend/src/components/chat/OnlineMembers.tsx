import React from "react";
import { Users } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface OnlineMember {
  id: string;
  username: string;
  lastActive: number;
}

interface OnlineMembersProps {
  members: OnlineMember[];
  currentUser: string;
}

export const OnlineMembers: React.FC<OnlineMembersProps> = ({
  members,
  currentUser,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Users className="w-4 h-4" />
          <span>{members.length} 在线</span>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>在线成员</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-3 py-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {member.username[0].toUpperCase()}
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {member.username}
                  {member.username === currentUser && " (你)"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
