  "use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-accent" size={24} strokeWidth={1.5} />,
      label: "Our Atelier",
      value: "Rue du Rhône 42, 1204 Geneva, Switzerland",
    },
    {
      icon: <Phone className="text-accent" size={24} strokeWidth={1.5} />,
      label: "Client Relations",
      value: "+41 22 555 0199",
    },
    {
      icon: <Mail className="text-accent" size={24} strokeWidth={1.5} />,
      label: "Email Enquiries",
      value: "concierge@megawatch.com",
    },
    {
      icon: <Clock className="text-accent" size={24} strokeWidth={1.5} />,
      label: "Atelier Hours",
      value: "Mon - Fri: 09:00 - 18:00 | Sat: By Appointment Only",
    },
  ];

  return (
    <main className="flex-1 bg-background pb-12 md:pb-16 relative overflow-hidden">
      <Navbar />

      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      {/* HERO SECTION */}
      <div className="w-full pt-28 px-6 md:px-12">
        <header className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-black tracking-[0.6em] uppercase mb-6 text-[10px]"
          >
            GET IN TOUCH
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-6 text-black leading-none uppercase"
          >
            CONTACT US
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-0.5 bg-accent mx-auto mb-8" 
          />
        </header>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 items-start">
          
          {/* LEFT: CONTACT INFO */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight text-black mb-4">
                MEGAWATCH CONCIERGE
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Whether you are seeking advice on choosing a timepiece, requesting customization assistance, or inquiring about maintenance services, our dedicated concierge team is at your disposal.
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((info, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-stone-50 border border-black/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-stone-400 font-display font-bold uppercase tracking-wider text-[10px] mb-1">
                      {info.label}
                    </h4>
                    <p className="text-black text-sm font-medium leading-relaxed">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white border border-black/5 rounded-[24px] p-6 md:p-8 shadow-sm relative overflow-hidden"
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-6"
                >
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-lg font-display font-bold uppercase tracking-wide text-black">
                    Message Transmitted
                  </h3>
                  <p className="text-stone-500 text-sm max-w-sm mx-auto">
                    Thank you for reaching out. A MegaWatch client representative will contact you within the next 24 business hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-[10px] font-bold text-accent uppercase tracking-widest hover:text-black transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-stone-50 border border-black/5 rounded-xl px-5 py-4 text-sm text-black placeholder-stone-300 focus:outline-none focus:border-accent focus:bg-white transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                        Your Email
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-stone-50 border border-black/5 rounded-xl px-5 py-4 text-sm text-black placeholder-stone-300 focus:outline-none focus:border-accent focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                      Message
                    </label>
                    <textarea 
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How may we assist you with your luxury timepiece journey?"
                      className="w-full bg-stone-50 border border-black/5 rounded-xl px-5 py-4 text-sm text-black placeholder-stone-300 focus:outline-none focus:border-accent focus:bg-white transition-all duration-300 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-accent text-black font-black uppercase tracking-[0.3em] text-[11px] hover:bg-black hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Transmit Inquiry
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}
