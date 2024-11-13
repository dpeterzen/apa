"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserProfile() {
  const session = useSession();
  return (
    <div>
      <Image
        src={session?.data?.user?.image || "/default-user-image.png"}
        width={44}
        height={44}
        alt="user image"
        className="rounded-full"
      />
    </div>
  );
}
