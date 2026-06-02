import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi";

const botResponses = [
  "I can help you find the perfect architecture design! What style are you looking for — modern, minimalist, tropical, or industrial?",
  "Great choice! Our SketchUp models come fully textured with V-Ray materials. Shall I show you our bestsellers in that category?",
  "All files include GLB/GLTF for real-time use, plus the original SketchUp file. You'll get lifetime access and free updates too.",
  "Our pricing ranges from Rp 55,000 to Rp 220,000 depending on complexity. Premium villa designs start around Rp 149,000.",
  "Yes! All licenses include commercial use — perfect for client presentations, renders, and property marketing.",
  "You can preview any model in our built-in 3D viewer with orbit controls, zoom, and wireframe mode before buying.",
  "Need something custom? Our commission service connects you with 850+ verified architects. Typical turnaround is 2–4 weeks.",
];
let responseIndex = 0;

export function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "bot", text: "Hi! I'm ArchBot 🏗️ Your AI assistant for finding the perfect 3D architecture design. How can I help?", time: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 800));
    setTyping(false);
    setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: botResponses[responseIndex++ % botResponses.length], time: new Date() }]);
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{ background: "var(--accent)" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={open ? "close" : "chat"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
            style={{ color: "#0a0a0a" }}>
            {open ? <IoClose size={22} /> : <IoChatbubbleEllipsesOutline size={22} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: 480, border: "1px solid var(--border-strong)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b" style={{ background: "rgba(200,169,110,0.08)", borderColor: "var(--border)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--accent)" }}>
                <HiSparkles size={16} style={{ color: "#0a0a0a" }} />
              </div>
              <div>
                <div className="text-sm font-heading font-semibold" style={{ color: "var(--text-primary)" }}>ArchBot</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online · AI Assistant
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[78%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={msg.role === "user"
                      ? { background: "var(--accent)", color: "#0a0a0a", fontWeight: 500 }
                      : { background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
                    {msg.text}
                    <div className="text-xs mt-1" style={{ color: msg.role === "user" ? "rgba(0,0,0,0.4)" : "var(--text-muted)" }}>
                      {msg.time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="rounded-xl px-4 py-3 flex gap-1 items-center" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--text-muted)" }}
                        animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                  placeholder="Ask about designs..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "var(--text-primary)" }} />
                <motion.button onClick={sendMessage} whileTap={{ scale: 0.9 }} disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40"
                  style={{ background: "rgba(200,169,110,0.15)", color: "var(--accent)" }}>
                  <IoSend size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
