import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send, Image, X } from "lucide-react";

interface GrcChatInputProps {
  onSend: (message: string, imageUrl?: string) => void;
  disabled?: boolean;
}

export const GrcChatInput = ({ onSend, disabled }: GrcChatInputProps) => {
  const [input, setInput] = useState("");
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dragCounter = useRef(0);

  // Auto-resize textarea
  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 96) + "px";
  };

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  const readImageFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setPastedImage(base64);
    };
    reader.readAsDataURL(file);
  }, []);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find((item) => item.type.startsWith("image/"));
    if (imageItem) {
      e.preventDefault();
      const file = imageItem.getAsFile();
      if (file) readImageFile(file);
    }
    // Text paste falls through naturally
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const file = Array.from(e.dataTransfer.files).find((f) =>
      f.type.startsWith("image/")
    );
    if (file) readImageFile(file);
  };

  const clearImage = () => {
    setPastedImage(null);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed && !pastedImage) return;
    if (disabled) return;
    onSend(trimmed, pastedImage ?? undefined);
    setInput("");
    setPastedImage(null);
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = (input.trim().length > 0 || pastedImage !== null) && !disabled;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className={`relative flex flex-col gap-1.5 bg-slate-50 border rounded-2xl p-2 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-300 ${
          isDragging
            ? "border-blue-400 ring-4 ring-blue-400/10 bg-blue-50/40"
            : "border-slate-200/80"
        }`}
      >
        {/* Drag-over overlay hint */}
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-blue-50/70 backdrop-blur-sm z-10 pointer-events-none">
            <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-blue-600">
              <Image className="w-4 h-4" />
              Drop image to attach
            </span>
          </div>
        )}

        {/* Image preview strip */}
        {pastedImage && (
          <div className="flex items-center gap-2 px-2 pt-1">
            <div className="relative rounded-lg overflow-hidden border border-blue-300/50 shadow-sm shrink-0">
              <img
                src={pastedImage}
                alt="Pasted image preview"
                className="h-14 w-auto max-w-[120px] object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-0.5 right-0.5 w-4 h-4 bg-slate-900/70 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Remove image"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
              Image attached · paste text or send
            </span>
          </div>
        )}

        {/* Textarea + send button row */}
        <div className="flex items-end gap-2 px-1">
          <textarea
            ref={textareaRef}
            id="grc-chat-input"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={
              pastedImage
                ? "Add a message (optional) and send…"
                : "Search Acts, compliance data, checklists… or paste an image"
            }
            disabled={disabled}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none py-2 px-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none resize-none overflow-hidden leading-relaxed"
            style={{ minHeight: "32px", maxHeight: "96px" }}
          />
          <button
            type="submit"
            disabled={!canSend}
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-200 disabled:text-slate-400 transition-all flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 shadow-md shadow-blue-500/10 mb-0.5"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
};
