"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { User, Mail, Lock, LogOut, MapPin, Phone, Calendar, ShoppingBag } from "lucide-react";

export default function ProfilePage() {
  const { user, login, logout, loading } = useUser();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credentials.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    login(email, name || undefined);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-between">
      <Navbar />

      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full pt-28 px-6 md:px-12 max-w-7xl mx-auto flex-grow pb-16 relative z-10 flex items-center justify-center">
        {!user ? (
          /* Login Form */
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white border border-black/5 rounded-[24px] p-8 md:p-10 shadow-xl"
          >
            <div className="text-center mb-8">
              <span className="text-accent text-[9px] font-black tracking-[0.4em] uppercase block mb-3">SECURE PORTAL</span>
              <h2 className="text-2xl font-black text-black uppercase tracking-tight">Access Account</h2>
              <div className="w-10 h-0.5 bg-accent mx-auto mt-4" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="text-red-500 text-xs font-semibold bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-2">Full Name (Optional)</label>
                <div className="relative">
                  <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-xs text-black focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-xs text-black focus:outline-none focus:border-accent transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-2">Security Key</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-stone-50 border border-black/5 rounded-xl pl-11 pr-4 py-3.5 text-xs text-black focus:outline-none focus:border-accent transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black hover:bg-accent hover:text-black text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all rounded-xl mt-6 shadow-md"
              >
                Unlock Profile
              </button>
            </form>
          </motion.div>
        ) : (
          /* Profile Details */
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 text-left">
            {/* User Meta Panel */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 bg-white border border-black/5 rounded-[24px] p-6 md:p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                  />
                  <div>
                    <h3 className="text-lg font-black text-black uppercase tracking-tight">{user.name}</h3>
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 flex items-center gap-1 mt-1">
                      <Calendar size={10} /> Member Since {user.joinDate}
                    </span>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-stone-100">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-2">Email Address</span>
                    <span className="text-xs text-black font-medium">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-2">Phone Contact</span>
                    <span className="text-xs text-black font-medium flex items-center gap-1.5">
                      <Phone size={12} className="text-accent" /> {user.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-2">Shipping Address</span>
                    <span className="text-xs text-stone-600 font-medium flex items-start gap-1.5 leading-relaxed">
                      <MapPin size={14} className="text-accent mt-0.5 flex-shrink-0" /> {user.address}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full py-3.5 bg-stone-50 border border-black/5 hover:bg-red-50 hover:text-red-500 hover:border-red-100 text-stone-500 text-[9px] font-black uppercase tracking-[0.2em] transition-all rounded-xl mt-8 flex items-center justify-center gap-2"
              >
                <LogOut size={12} /> Sign Out Session
              </button>
            </motion.div>

            {/* Orders Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white border border-black/5 rounded-[24px] p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-xl font-black text-black uppercase tracking-tight mb-6 flex items-center gap-2">
                <ShoppingBag size={18} className="text-accent" /> Order History
              </h2>

              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div 
                    key={order.id}
                    className="p-5 border border-stone-100 rounded-2xl hover:border-accent/40 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-black">{order.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-accent/10 text-accent-dark"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-stone-500 text-xs font-semibold mt-2">{order.item}</p>
                      <span className="text-[9px] text-stone-400 font-medium block mt-1">{order.date}</span>
                    </div>
                    <div className="text-right sm:text-right text-base font-black text-black tracking-tight">
                      {order.total}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
