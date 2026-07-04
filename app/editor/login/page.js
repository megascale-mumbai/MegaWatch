"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, AlertTriangle, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.push("/editor");
          }
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    }
    checkSession();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/editor");
      } else {
        setError(data.message || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Login request error:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-stone-900 flex flex-col items-center justify-center relative overflow-hidden font-sans px-6">
      {/* Subtle background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-stone-100 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white border border-stone-200/80 p-8 sm:p-10 rounded-[28px] shadow-xl relative z-10"
      >
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-indigo-300/60 rounded-tl-md pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-indigo-300/60 rounded-br-md pointer-events-none" />

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-base font-black tracking-[0.25em] text-stone-900 uppercase">
              MegaWatch
            </span>
          </div>
          <h1 className="text-xl font-extrabold uppercase tracking-widest text-stone-900 mb-2">
            Concierge <span className="text-indigo-600 italic">Login</span>
          </h1>
          <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
            Authorize to access Watch Customization Editor
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 text-xs"
          >
            <AlertTriangle size={16} className="shrink-0" />
            <p className="font-medium">{error}</p>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 block">
              Username
            </label>
            <div className="relative flex items-center">
              <User size={15} className="absolute left-4 text-stone-400" />
              <input
                type="text"
                placeholder="Enter username"
                className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 focus:border-indigo-400 focus:bg-white rounded-2xl text-sm text-stone-900 focus:outline-none transition-all placeholder:text-stone-400 font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 block">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={15} className="absolute left-4 text-stone-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full pl-11 pr-12 py-3.5 bg-stone-50 border border-stone-200 focus:border-indigo-400 focus:bg-white rounded-2xl text-sm text-stone-900 focus:outline-none transition-all placeholder:text-stone-400 font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 p-1 text-stone-400 hover:text-stone-700 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.25em] rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              "Enter Editor"
            )}
          </button>
        </form>

        {/* Footer link */}
        <div className="text-center mt-8 pt-6 border-t border-stone-100">
          <Link
            href="/"
            className="text-stone-400 hover:text-stone-700 transition-colors text-[9px] font-bold uppercase tracking-widest"
          >
            ← Back to store home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
