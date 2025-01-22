"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent } from "../ui/card";
import { useSession } from "@/hooks/useSession";
import { UserInfo } from "@/types/profile";

export function ProfileCard() {
  const session = useSession();
  const { user } = session || {};

  const userInfo: UserInfo = {
    name: user?.user_metadata?.full_name || "Unknown User",
    email: user?.email || "No Email",
    avatarUrl:
      user?.user_metadata?.avatar_url || "/placeholder.svg?height=80&width=80",
  };

  return (
    <Card className="mb-6">
      <CardContent className="flex items-center space-x-4 pt-7">
        <Avatar className="w-20 h-20">
          <AvatarImage
            className="rounded-full"
            src={userInfo.avatarUrl}
            alt={userInfo.name}
          />
          <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{userInfo.name}</p>
          <p className="text-sm text-muted-foreground">{userInfo.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
