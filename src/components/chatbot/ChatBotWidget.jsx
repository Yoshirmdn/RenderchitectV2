import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend, IoRefreshOutline } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";
import { detectLanguage, processBotResponse, RESPONSES, QUICK_REPLIES } from "../../services/chatbotEngine";
import { askGemini } from "../../services/geminiService";
import ReactMarkdown from "react-markdown";

const formatMessage = (text, role) => {
  if (!text) return null;
  if (role === "user") {
    return text;
  }
  return (
    <ReactMarkdown
      components={{
        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
        li: ({ node, ...props }) => <li className="text-sm" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-bold text-[#C8A96E]" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        a: ({ node, ...props }) => <a className="underline hover:text-[#C8A96E] transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [chatState, setChatState] = useState("ASK_AREA");
  const [userData, setUserData] = useState({ type: null, area: null, budget: null });
  const [lang, setLang] = useState("id");
  const [quickReplies, setQuickReplies] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  // Initialize/Reset chat on mount or when messages is empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "init",
          role: "bot",
          text: RESPONSES[lang].greeting,
          time: new Date()
        }
      ]);
      setQuickReplies(QUICK_REPLIES[lang].type);
      setChatState("ASK_AREA");
      setUserData({ type: null, area: null, budget: null });
    }
  }, [messages, lang]);

  // Scroll to bottom on new messages or typing
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleReset = () => {
    setMessages([]);
  };

  const selectQuickReply = async (reply) => {
    // Add user selection as a message
    const userMsg = { id: Date.now(), role: "user", text: reply.label, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setQuickReplies([]); // Clear immediately to prevent double clicks
    setTyping(true);

    // Simulated short delay for natural feel
    await new Promise(r => setTimeout(r, 800 + Math.random() * 400));

    // Process using chatbot engine state machine
    const result = processBotResponse({
      state: chatState,
      input: reply.value,
      lang,
      userData
    });

    setTyping(false);
    
    // Add bot response
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "bot",
        text: result.responseText,
        recommendations: result.recommendations,
        time: new Date()
      }
    ]);

    // Update engine states
    setChatState(result.nextState);
    setUserData(result.userData);
    setQuickReplies(result.quickReplies);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    
    // Auto-detect language from input
    const detectedLang = detectLanguage(userText);
    if (detectedLang !== lang) {
      setLang(detectedLang);
    }

    // Add user message
    const userMsg = { id: Date.now(), role: "user", text: userText, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Check if user wants to reset manually
    if (userText.toLowerCase() === "reset" || userText.toLowerCase() === "mulai ulang") {
      await new Promise(r => setTimeout(r, 600));
      setTyping(false);
      handleReset();
      return;
    }

    // If we are still in the qualification flow, try to match input with quick reply choices
    const currentReplies = QUICK_REPLIES[lang][
      chatState === "ASK_AREA" ? "type" : chatState === "ASK_BUDGET" ? "area" : chatState === "RECOMMEND" ? "budget" : ""
    ] || [];

    const matchedReply = currentReplies.find(
      r => r.label.toLowerCase() === userText.toLowerCase() || r.value.toLowerCase() === userText.toLowerCase()
    );

    if (matchedReply && chatState !== "FREE_CHAT") {
      // Input matches one of the options, advance flow
      await new Promise(r => setTimeout(r, 800));
      setTyping(false);
      
      const result = processBotResponse({
        state: chatState,
        input: matchedReply.value,
        lang,
        userData
      });

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: result.responseText,
          recommendations: result.recommendations,
          time: new Date()
        }
      ]);
      setChatState(result.nextState);
      setUserData(result.userData);
      setQuickReplies(result.quickReplies);
    } else {
      // Free-text query: query Gemini API
      // We pass the conversation history (filtering out empty messages) and onboarding context
      const botReply = await askGemini(userText, messages, userData);
      setTyping(false);
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: botReply,
          time: new Date()
        }
      ]);
      
      // If we were in onboarding flow and asked something unrelated, keep the current quick replies
      // so user can still choose to continue. But if we are in RECOMMEND state and user chats, 
      // they have transitioned to free chat.
      if (chatState === "RECOMMEND") {
        setChatState("FREE_CHAT");
        setQuickReplies([]);
      }
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer"
        style={{ background: "var(--accent)" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? "close" : "chat"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ color: "#0a0a0a" }}
          >
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
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-[420px] glass-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[calc(100vh-120px)]"
            style={{ height: 560, border: "1px solid var(--border-strong)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b" style={{ background: "rgba(200,169,110,0.08)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3">
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
              
              {/* Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title={RESPONSES[lang].resetBtn}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <IoRefreshOutline size={18} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <IoClose size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-sm"
                      style={
                        msg.role === "user"
                          ? { background: "var(--accent)", color: "#0a0a0a", fontWeight: 500 }
                          : { background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)" }
                      }
                    >
                      {formatMessage(msg.text, msg.role)}
                      <div
                        className="text-[10px] mt-1 text-right"
                        style={{ color: msg.role === "user" ? "rgba(0,0,0,0.45)" : "var(--text-secondary)" }}
                      >
                        {msg.time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </motion.div>

                  {/* Render Product Recommendations if present in the message */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-2.5 pl-2"
                    >
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin snap-x snap-mandatory">
                        {msg.recommendations.map((proj) => (
                          <div
                            key={proj.id}
                            className="flex-shrink-0 w-64 bg-surface-card rounded-xl border border-theme overflow-hidden snap-start flex flex-col"
                            style={{ background: "var(--bg-card)" }}
                          >
                            <img
                              src={proj.images[0]}
                              alt={proj.title}
                              className="h-28 w-full object-cover"
                            />
                            <div className="p-3 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="text-xs text-secondary font-medium tracking-wide uppercase">
                                  {proj.category}
                                </div>
                                <h4 className="text-sm font-heading font-semibold line-clamp-1 mt-0.5" style={{ color: "var(--text-primary)" }}>
                                  {proj.title}
                                </h4>
                                <div className="text-xs text-secondary mt-1">
                                  {proj.area}m² · {proj.dimensions.floors} floors
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3 pt-2 border-t border-theme">
                                <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>
                                  Rp {proj.price.toLocaleString("id-ID")}
                                </span>
                                <Link
                                  to={`/projects/${proj.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                  style={{ background: "var(--accent)", color: "#0a0a0a" }}
                                >
                                  {lang === "en" ? "View" : "Detail"}
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="rounded-xl px-4 py-3 flex gap-1 items-center" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--text-secondary)" }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>


            {/* Input Area */}
            <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={lang === "en" ? "Ask about designs or pricing..." : "Tanya seputar desain atau harga..."}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "var(--text-primary)" }}
                />
                <motion.button
                  onClick={sendMessage}
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer"
                  style={{ background: "rgba(200,169,110,0.15)", color: "var(--accent)" }}
                >
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
