import { useState } from "react";
import type { GrcChatMessage as ChatMessageType, GrcChatAction, GrcSearchResult } from "@/hooks/useGrcChat";
import { 
  Shield, User, ExternalLink, ArrowRight, Download, 
  FileText, Scale, Settings, BookOpen, AlertCircle, Calculator,
  Copy, Check, ThumbsUp, ThumbsDown
} from "lucide-react";

interface GrcChatMessageProps {
  message: ChatMessageType;
  onActionClick: (action: GrcChatAction) => void;
}

export const GrcChatMessage = ({ message, onActionClick }: GrcChatMessageProps) => {
  const isBot = message.type === "bot";
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopy = () => {
    if (message.content) {
      navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "statutory":
        return <Scale className="w-4 h-4 text-amber-600" />;
      case "service":
        return <Settings className="w-4 h-4 text-blue-600" />;
      case "resource":
        return <FileText className="w-4 h-4 text-emerald-600" />;
      case "library":
        return <BookOpen className="w-4 h-4 text-indigo-650" />;
      case "calculator":
        return <Calculator className="w-4 h-4 text-violet-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "statutory":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "service":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "resource":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "library":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "calculator":
        return "bg-violet-50 text-violet-700 border-violet-200";
      default:
        return "bg-slate-550/10 text-slate-500 border-slate-200";
    }
  };

  return (
    <div className={`flex w-full mb-4 ${isBot ? "justify-start" : "justify-end"}`}>
      <div className={`flex max-w-[88%] gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm border ${
          isBot 
            ? "bg-gradient-to-tr from-blue-600 to-indigo-650 text-white border-blue-500" 
            : "bg-slate-100 text-slate-600 border-slate-200"
        }`}>
          {isBot ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
        </div>

        {/* Bubble & Cards */}
        <div className="flex flex-col gap-2.5 max-w-full">
          {/* Main Bubble */}
          {message.content && (
            <div className={`p-4 rounded-2xl border transition-all shadow-sm flex flex-col gap-2 ${
              isBot
                ? "bg-white border-slate-150 text-slate-700 rounded-tl-none text-xs leading-relaxed font-medium"
                : "bg-blue-600 border-blue-550 text-white rounded-tr-none text-xs leading-relaxed font-semibold"
            }`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {/* Copy & Feedback Controls for Bot Messages */}
              {isBot && (
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100 text-[10px] text-slate-400">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    title="Copy response"
                    aria-label="Copy response to clipboard"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFeedback("up")}
                      className={`p-1 rounded hover:text-emerald-600 transition-colors ${feedback === "up" ? "text-emerald-600 font-bold" : ""}`}
                      title="Helpful"
                      aria-label="Mark helpful"
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setFeedback("down")}
                      className={`p-1 rounded hover:text-rose-600 transition-colors ${feedback === "down" ? "text-rose-600 font-bold" : ""}`}
                      title="Not helpful"
                      aria-label="Mark not helpful"
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Search Results */}
          {isBot && message.searchResults && message.searchResults.length > 0 && (
            <div className="flex flex-col gap-3 mt-1.5 w-full">
              {message.searchResults.map((result: GrcSearchResult) => (
                <div 
                  key={result.id} 
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow transition-all space-y-3 text-left w-full max-w-[340px] md:max-w-[380px]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-wider ${getBadgeStyle(result.type)}`}>
                      {result.type}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {getResultIcon(result.type)}
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-450">
                        {result.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-850 leading-tight">
                      {result.title}
                    </h4>
                    <p className="text-[10px] text-slate-550 font-medium leading-normal whitespace-pre-line">
                      {result.description}
                    </p>
                  </div>

                  {/* Result Actions */}
                  <div className="flex gap-2 pt-1 border-t border-slate-100">
                    {result.link && (
                      <button
                        onClick={() => onActionClick({ label: "Open Link", value: result.link!, type: "link" })}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-black text-slate-655 rounded-xl transition-all hover:text-blue-600 hover:border-blue-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    )}
                    {result.downloadUrl && (
                      <button
                        onClick={() => onActionClick({ label: "Download PDF", value: result.downloadUrl!, type: "link" })}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-250 text-[10px] font-black text-emerald-650 rounded-xl transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Replies / Message Actions */}
          {isBot && message.actions && message.actions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {message.actions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => onActionClick(action)}
                  className="rounded-full bg-white hover:bg-blue-50/40 border border-slate-200 text-slate-655 hover:text-blue-600 hover:border-blue-300 h-8 px-3.5 text-[10px] font-extrabold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  {action.type === "link" && <ExternalLink className="w-3 h-3" />}
                  <span>{action.label}</span>
                  {action.type === "quickReply" && <ArrowRight className="w-3 h-3 text-slate-400" />}
                </button>
              ))}
            </div>
          )}

          {/* Timestamp */}
          <span className={`text-[9px] font-bold text-slate-400 uppercase tracking-wider px-1 mt-0.5 ${
            isBot ? "text-left" : "text-right"
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </div>
  );
};
