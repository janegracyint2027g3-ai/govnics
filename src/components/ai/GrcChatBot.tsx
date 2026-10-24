import { useRef, useEffect } from "react";
import { useGrcChat } from "@/hooks/useGrcChat";
import { GrcChatMessage } from "./GrcChatMessage";
import { GrcChatInput } from "./GrcChatInput";
import { MessageSquare, X, Minus, Sparkles, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const GrcChatBot = () => {
  const {
    isOpen,
    toggleChat,
    messages,
    isTyping,
    hasUnread,
    currentContext,
    resetConversation,
    handleSendMessage,
    handleAction
  } = useGrcChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none select-none">
      {/* Animated Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, originX: 0.95, originY: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white border border-slate-200 shadow-2xl rounded-[2rem] overflow-hidden mb-4 flex flex-col pointer-events-auto w-[90vw] md:w-[380px] h-[550px] max-h-[75vh]"
          >
            {/* Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-blue-600 via-blue-650 to-indigo-650 text-white relative overflow-hidden flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3 relative z-10 min-w-0 pr-2">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-blue-600"></span>
                  </span>
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-black text-white text-sm leading-tight">Govey</h3>
                    <span className="text-[9px] px-1.5 py-0.2 font-extrabold rounded bg-white/20 text-white/90">AI</span>
                  </div>
                  <p className="text-[9px] text-white/80 font-bold uppercase tracking-wider mt-0.5 truncate">
                    {currentContext.badgeText}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={resetConversation}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  title="Reset conversation for this page"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={toggleChat}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize chat"
                  aria-label="Minimize chat"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dynamic Page Context Bar */}
            <div className="px-4 py-2 bg-slate-50/95 border-b border-slate-200/80 flex items-center justify-between gap-2 shrink-0 backdrop-blur-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
                  Context:
                </span>
                <span className="text-[11px] font-bold text-slate-700 truncate" title={currentContext.pageTitle}>
                  {currentContext.pageTitle}
                </span>
              </div>
              <span className="text-[9px] font-bold text-blue-700 bg-blue-50/90 border border-blue-200/60 px-2 py-0.5 rounded-full shrink-0">
                {currentContext.category}
              </span>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-5 bg-gradient-to-b from-slate-50/50 to-white/50 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <GrcChatMessage
                  key={msg.id}
                  message={msg}
                  onActionClick={handleAction}
                />
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 p-2.5 bg-white border border-slate-150 rounded-xl w-fit shadow-sm animate-pulse text-left">
                  <div className="flex gap-1 shrink-0">
                    <div className="w-1.5 h-1.5 bg-blue-500/40 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-blue-500/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-blue-500/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span>Govey is scanning files...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-5px_25px_-5px_rgba(15,23,42,0.03)] shrink-0">
              <GrcChatInput onSend={handleSendMessage} disabled={isTyping} />
              <p className="mt-2 text-[9px] text-slate-400 font-extrabold text-center uppercase tracking-widest">
                GovCompliance AI Advisory Desk
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button & Unread Pill */}
      <div className="relative flex items-center">
        {!isOpen && hasUnread && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className="absolute right-16 bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-semibold py-1.5 px-3 rounded-xl shadow-xl pointer-events-auto border border-slate-700 whitespace-nowrap hidden sm:flex items-center gap-1.5 cursor-pointer"
            onClick={toggleChat}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{currentContext.badgeText} Advice</span>
          </motion.div>
        )}

        <button
          onClick={toggleChat}
          title={`Govey AI - ${currentContext.badgeText} (${currentContext.pageTitle})`}
          className={`h-14 w-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95 group relative overflow-hidden pointer-events-auto border hover:scale-105 shadow-blue-500/20 ${
            isOpen
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-blue-600 border-blue-550 text-white"
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 animate-pulse" />}

          {!isOpen && hasUnread && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-white rounded-full z-10 animate-bounce"></span>
          )}
        </button>
      </div>
    </div>
  );
};
export default GrcChatBot;
