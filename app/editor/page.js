"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WatchEditor from "@/components/editor/WatchEditor";

export default function EditorPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setChecking(false);
            return;
          }
        }
        router.push("/editor/login");
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/editor/login");
      }
    }
    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-screen w-screen bg-[var(--background)] overflow-hidden">
      <WatchEditor />
    </main>
  );
}
