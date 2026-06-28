"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const AGENT_ID = "agent_6401kw4cmcfrf8c8hfg8ypp7mjky";

const LABELS = {
  doctorName: "دکتر فرزانه آقامحمدی خامنه",
  credential: "M.D., Retina Subspecialist",
  statusDisconnected: "آفلاین",
  statusConnecting: "در حال اتصال...",
  statusConnected: "آنلاین",
  statusError: "خطا در اتصال",
  modeVoice: "صوتی",
  modeChat: "متنی",
  startConversation: "شروع مکالمه",
  endConversation: "پایان مکالمه",
  close: "بستن",
  openWidget: "باز کردن دستیار",
  sendMessage: "ارسال پیام",
  inputPlaceholder: "پیام خود را بنویسید...",
  emptyState: "سوال خود را بپرسید...",
  emptyStateSub: "دستیار هوشمند مطب آماده پاسخگویی است.",
  listeningState: "در حال گوش دادن...",
  speakingState: "در حال صحبت...",
  connectingState: "در حال اتصال...",
  idleState: "آماده برای مکالمه",
  dragHandle: "بکشید تا ببندید",
};

// ─────────────────────────────────────────────
// Inner widget — must be inside ConversationProvider
// ─────────────────────────────────────────────
function WidgetInner({ isOpen, activeTab, setActiveTab, messages, setMessages, onClose }) {
  const { startSession, endSession, status, mode, isSpeaking, sendUserMessage } = useConversation();
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat tab is active
  useEffect(() => {
    if (activeTab === "chat" && isOpen && status === "connected") {
      inputRef.current?.focus();
    }
  }, [activeTab, isOpen, status]);

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";
  const isDisconnected = status === "disconnected" || status === "error";

  function statusLabel() {
    if (status === "connecting") return LABELS.statusConnecting;
    if (status === "connected") {
      if (activeTab === "voice") {
        if (isSpeaking) return LABELS.speakingState;
        return LABELS.listeningState;
      }
      return LABELS.statusConnected;
    }
    if (status === "error") return LABELS.statusError;
    return LABELS.statusDisconnected;
  }

  async function handleStart() {
    try {
      if (activeTab === "voice") {
        await startSession({ agentId: AGENT_ID });
      } else {
        setMessages([]);
        await startSession({ agentId: AGENT_ID, textOnly: true });
      }
    } catch (e) {
      console.error("Failed to start session:", e);
    }
  }

  function handleEnd() {
    endSession();
    if (activeTab === "chat") setMessages([]);
  }

  function handleSend() {
    const text = chatInput.trim();
    if (!text || !isConnected) return;
    // Optimistically add user bubble
    setMessages((prev) => [...prev, { role: "user", message: text }]);
    sendUserMessage(text);
    setChatInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // Orb animation class based on voice mode
  function orbClass() {
    if (!isConnected) return "orb orb-idle";
    if (isSpeaking) return "orb orb-speaking";
    return "orb orb-listening";
  }

  return (
    <div
      className="widget-panel"
      role="dialog"
      aria-label={LABELS.doctorName}
      aria-modal="true"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      {/* Drag handle (mobile only) */}
      <div className="drag-handle" aria-label={LABELS.dragHandle}>
        <div className="drag-pill" />
      </div>

      {/* ── Header ── */}
      <header className="panel-header">
        <div className="header-info">
          <span className="header-name">{LABELS.doctorName}</span>
          <span
            className="header-status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className={`status-dot ${isConnected ? "dot-online" : isConnecting ? "dot-connecting" : "dot-offline"}`} />
            {statusLabel()}
          </span>
        </div>

        {/* Voice / Chat toggle */}
        <div className="mode-toggle" role="tablist" aria-label="حالت مکالمه">
          <button
            role="tab"
            aria-selected={activeTab === "voice"}
            aria-label={LABELS.modeVoice}
            className={`toggle-btn ${activeTab === "voice" ? "toggle-active" : ""}`}
            onClick={() => {
              if (isConnected) handleEnd();
              setActiveTab("voice");
            }}
          >
            {LABELS.modeVoice}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "chat"}
            aria-label={LABELS.modeChat}
            className={`toggle-btn ${activeTab === "chat" ? "toggle-active" : ""}`}
            onClick={() => {
              if (isConnected) handleEnd();
              setActiveTab("chat");
            }}
          >
            {LABELS.modeChat}
          </button>
        </div>

        <button
          className="icon-btn close-btn"
          onClick={onClose}
          aria-label={LABELS.close}
        >
          <XIcon />
        </button>
      </header>

      {/* ── Body ── */}
      <div className="panel-body">

        {/* ── VOICE MODE ── */}
        {activeTab === "voice" && (
          <div className="voice-view">
            {/* Orb */}
            <div className="orb-container" aria-hidden="true">
              <div className={orbClass()}>
                <div className="ring ring-1" />
                <div className="ring ring-2" />
                <div className="ring ring-3" />
                <div className="orb-core">
                  <MicIcon size={28} />
                </div>
              </div>
            </div>

            {/* State label (aria-live region already in header) */}
            <p className="voice-state-label" aria-hidden="true">
              {isConnecting ? LABELS.connectingState
                : isConnected
                  ? (isSpeaking ? LABELS.speakingState : LABELS.listeningState)
                  : LABELS.idleState}
            </p>

            {/* CTA button */}
            {isDisconnected && (
              <button
                className="cta-btn"
                onClick={handleStart}
                aria-label={LABELS.startConversation}
              >
                <MicIcon size={18} />
                {LABELS.startConversation}
              </button>
            )}

            {isConnecting && (
              <button className="cta-btn cta-muted" disabled aria-label={LABELS.connectingState}>
                <SpinnerIcon />
                {LABELS.connectingState}
              </button>
            )}

            {isConnected && (
              <button
                className="cta-btn cta-end"
                onClick={handleEnd}
                aria-label={LABELS.endConversation}
              >
                <PhoneOffIcon size={18} />
                {LABELS.endConversation}
              </button>
            )}
          </div>
        )}

        {/* ── CHAT MODE ── */}
        {activeTab === "chat" && (
          <div className="chat-view">
            {/* Messages area */}
            <div className="messages-area" role="log" aria-live="polite" aria-label="تاریخچه مکالمه">
              {messages.length === 0 ? (
                <div className="empty-state">
                  <ChatIcon size={36} />
                  <p className="empty-title">{LABELS.emptyState}</p>
                  <p className="empty-sub">{LABELS.emptyStateSub}</p>
                  {isDisconnected && (
                    <button
                      className="cta-btn cta-sm"
                      onClick={handleStart}
                      aria-label={LABELS.startConversation}
                    >
                      {LABELS.startConversation}
                    </button>
                  )}
                  {isConnecting && (
                    <button className="cta-btn cta-sm cta-muted" disabled>
                      <SpinnerIcon />
                      {LABELS.connectingState}
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`bubble-row ${msg.role === "user" ? "bubble-user-row" : "bubble-agent-row"}`}
                    >
                      {msg.role !== "user" && (
                        <div className="avatar" aria-hidden="true">
                          <EyeIcon size={14} />
                        </div>
                      )}
                      <div
                        className={`bubble ${msg.role === "user" ? "bubble-user" : "bubble-agent"}`}
                        role="article"
                        aria-label={msg.role === "user" ? "پیام شما" : "پاسخ دستیار"}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input row */}
            <div className="input-row">
              <input
                ref={inputRef}
                className="chat-input"
                type="text"
                placeholder={isConnected ? LABELS.inputPlaceholder : LABELS.startConversation + "..."}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!isConnected}
                aria-label="متن پیام"
                dir="rtl"
              />
              {isDisconnected && (
                <button
                  className="send-btn start-btn"
                  onClick={handleStart}
                  aria-label={LABELS.startConversation}
                  title={LABELS.startConversation}
                >
                  <PlayIcon size={18} />
                </button>
              )}
              {isConnecting && (
                <button className="send-btn" disabled aria-label={LABELS.connectingState}>
                  <SpinnerIcon />
                </button>
              )}
              {isConnected && (
                <button
                  className="send-btn"
                  onClick={handleSend}
                  disabled={!chatInput.trim()}
                  aria-label={LABELS.sendMessage}
                >
                  <SendIcon size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Root export — manages UI state + Provider
// ─────────────────────────────────────────────
export default function ElevenLabsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("voice");
  const [messages, setMessages] = useState([]);

  // onMessage is stable — passed to ConversationProvider
  const handleMessage = useCallback(({ message, source }) => {
    // In voice mode collect both; in chat mode only add agent messages
    // (user text was already added optimistically)
    setMessages((prev) => {
      if (source === "ai") {
        return [...prev, { role: "agent", message }];
      }
      // For voice mode transcriptions, add user side too
      // For chat mode, user message was already added — skip duplicate
      const lastUser = [...prev].reverse().find((m) => m.role === "user");
      if (lastUser && lastUser.message === message) return prev;
      return [...prev, { role: "user", message }];
    });
  }, []);

  return (
    <>
      <style>{WIDGET_STYLES}</style>

      <div className="widget-root" dir="ltr">
        {/* Floating trigger button */}
        {!isOpen && (
          <button
            className="trigger-btn"
            onClick={() => setIsOpen(true)}
            aria-label={LABELS.openWidget}
            aria-expanded="false"
          >
            <MicIcon size={20} />
            <span className="trigger-divider" aria-hidden="true" />
            <ChatIcon size={20} />
          </button>
        )}

        {/* Provider wraps WidgetInner so hooks can access context */}
        <ConversationProvider
          agentId={AGENT_ID}
          onMessage={handleMessage}
        >
          <WidgetInner
            isOpen={isOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            messages={messages}
            setMessages={setMessages}
            onClose={() => setIsOpen(false)}
          />
        </ConversationProvider>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// Inline SVG icons
// ─────────────────────────────────────────────
function MicIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}
function ChatIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function SendIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
  );
}
function PhoneOffIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
      <path d="M14 2a4 4 0 0 1 4 4" /><line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}
function PlayIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
function SpinnerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="spin-icon" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
function EyeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// All styles — only CSS variables, no hardcoded values
// ─────────────────────────────────────────────
const WIDGET_STYLES = `
  /* ── Root positioning ── */
  .widget-root {
    position: fixed;
    bottom: 22px;
    left: 22px;
    z-index: 80;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: var(--font-vazir, 'Vazirmatn', Tahoma, sans-serif);
  }

  /* ── Trigger pill button ── */
  .trigger-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--color-primary, #1A6B72);
    color: #fff;
    border: none;
    border-radius: 999px;
    padding: 13px 20px;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(26,107,114,.35);
    transition: transform .2s, box-shadow .2s, background .2s;
    font-family: inherit;
  }
  .trigger-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(26,107,114,.42);
  }
  .trigger-btn:focus-visible {
    outline: 3px solid var(--color-secondary, #C49A3C);
    outline-offset: 3px;
  }
  .trigger-divider {
    width: 1.5px;
    height: 18px;
    background: rgba(255,255,255,.35);
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* ── Panel ── */
  .widget-panel {
    width: 380px;
    height: 520px;
    background: var(--color-bg, #F7F4EF);
    border-radius: 22px;
    box-shadow: 0 16px 48px rgba(26,107,114,.18), 0 2px 8px rgba(26,107,114,.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    direction: rtl;
  }

  /* ── Drag handle (mobile) ── */
  .drag-handle {
    display: none;
    justify-content: center;
    padding: 10px 0 4px;
    flex-shrink: 0;
  }
  .drag-pill {
    width: 40px;
    height: 4px;
    background: var(--color-accent, #A8D5DA);
    border-radius: 2px;
  }

  /* ── Header ── */
  .panel-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px 12px;
    border-bottom: 1.5px solid var(--color-accent, #A8D5DA);
    flex-shrink: 0;
  }
  .header-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .header-name {
    font-weight: 700;
    font-size: 13.5px;
    color: var(--color-primary, #1A6B72);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--font-vazir, inherit);
  }
  .header-status {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    color: var(--color-text, #2C2C2C);
    opacity: .75;
    font-family: var(--font-vazir, inherit);
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot-online  { background: #3DAA72; }
  .dot-connecting { background: var(--color-secondary, #C49A3C); animation: pulse-dot 1s infinite; }
  .dot-offline { background: #AAA; }

  /* ── Mode toggle ── */
  .mode-toggle {
    display: flex;
    background: var(--color-accent, #A8D5DA);
    border-radius: 999px;
    padding: 3px;
    gap: 2px;
    flex-shrink: 0;
  }
  .toggle-btn {
    background: transparent;
    border: none;
    border-radius: 999px;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-primary, #1A6B72);
    transition: background .18s, color .18s;
    font-family: var(--font-vazir, inherit);
  }
  .toggle-btn:focus-visible {
    outline: 2px solid var(--color-secondary, #C49A3C);
    outline-offset: 2px;
  }
  .toggle-active {
    background: var(--color-primary, #1A6B72);
    color: #fff;
  }

  /* ── Icon buttons ── */
  .icon-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 5px;
    transition: background .15s;
    color: var(--color-text, #2C2C2C);
    flex-shrink: 0;
  }
  .icon-btn:hover { background: var(--color-accent, #A8D5DA); }
  .icon-btn:focus-visible {
    outline: 2px solid var(--color-secondary, #C49A3C);
    outline-offset: 2px;
  }

  /* ── Body ── */
  .panel-body {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ─────────── VOICE MODE ─────────── */
  .voice-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 24px 20px;
  }

  /* Orb */
  .orb-container { position: relative; width: 140px; height: 140px; display: flex; align-items: center; justify-content: center; }
  .orb { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
  .orb-core {
    position: relative;
    z-index: 2;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: var(--color-primary, #1A6B72);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 24px rgba(26,107,114,.4);
    transition: transform .3s;
  }
  .ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid var(--color-secondary, #C49A3C);
    opacity: 0;
  }
  .ring-1 { width: 96px; height: 96px; }
  .ring-2 { width: 116px; height: 116px; }
  .ring-3 { width: 136px; height: 136px; }

  /* Idle: subtle slow pulse */
  .orb-idle .ring-1 { animation: ring-pulse 3s ease-in-out infinite; }
  .orb-idle .ring-2 { animation: ring-pulse 3s ease-in-out infinite .6s; }
  .orb-idle .ring-3 { animation: ring-pulse 3s ease-in-out infinite 1.2s; }

  /* Listening: medium pulse */
  .orb-listening .orb-core { transform: scale(1.05); }
  .orb-listening .ring-1 { animation: ring-pulse 1.6s ease-in-out infinite; }
  .orb-listening .ring-2 { animation: ring-pulse 1.6s ease-in-out infinite .3s; }
  .orb-listening .ring-3 { animation: ring-pulse 1.6s ease-in-out infinite .6s; }

  /* Speaking: fast energetic pulse */
  .orb-speaking .orb-core { transform: scale(1.1); box-shadow: 0 8px 32px rgba(26,107,114,.55); }
  .orb-speaking .ring-1 { animation: ring-pulse .9s ease-in-out infinite; }
  .orb-speaking .ring-2 { animation: ring-pulse .9s ease-in-out infinite .2s; }
  .orb-speaking .ring-3 { animation: ring-pulse .9s ease-in-out infinite .4s; }

  .voice-state-label {
    font-size: 14px;
    color: var(--color-text, #2C2C2C);
    opacity: .7;
    margin: 0;
    font-family: var(--font-vazir, inherit);
  }

  /* ─────────── CTA BUTTONS ─────────── */
  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--color-cta, #D4706A);
    color: #fff;
    border: none;
    border-radius: 14px;
    padding: 13px 28px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background .2s, transform .15s;
    font-family: var(--font-vazir, inherit);
    box-shadow: 0 6px 18px rgba(212,112,106,.32);
  }
  .cta-btn:hover { background: #C25E58; transform: translateY(-2px); }
  .cta-btn:focus-visible { outline: 3px solid var(--color-secondary, #C49A3C); outline-offset: 3px; }
  .cta-end { background: rgba(26,107,114,.12); color: var(--color-primary, #1A6B72); box-shadow: none; }
  .cta-end:hover { background: rgba(26,107,114,.2); transform: translateY(-1px); }
  .cta-muted { background: var(--color-accent, #A8D5DA); color: var(--color-primary, #1A6B72); box-shadow: none; cursor: not-allowed; opacity: .8; }
  .cta-muted:hover { transform: none; }
  .cta-sm { padding: 10px 22px; font-size: 14px; margin-top: 8px; }

  /* ─────────── CHAT MODE ─────────── */
  .chat-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 14px 14px 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    scroll-behavior: smooth;
  }
  .messages-area::-webkit-scrollbar { width: 4px; }
  .messages-area::-webkit-scrollbar-thumb { background: var(--color-accent, #A8D5DA); border-radius: 4px; }

  /* Empty state */
  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;
    color: var(--color-primary, #1A6B72);
    padding: 20px;
  }
  .empty-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--color-primary, #1A6B72);
    margin: 4px 0 0;
    font-family: var(--font-vazir, inherit);
  }
  .empty-sub {
    font-size: 13px;
    color: var(--color-text, #2C2C2C);
    opacity: .6;
    margin: 0;
    font-family: var(--font-vazir, inherit);
  }

  /* Bubbles */
  .bubble-row {
    display: flex;
    align-items: flex-end;
    gap: 7px;
    max-width: 90%;
  }
  .bubble-user-row { align-self: flex-start; flex-direction: row-reverse; }
  .bubble-agent-row { align-self: flex-end; }
  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--color-primary, #1A6B72);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .bubble {
    padding: 9px 13px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.65;
    max-width: 260px;
    word-break: break-word;
    font-family: var(--font-vazir, inherit);
    direction: rtl;
    text-align: right;
  }
  .bubble-user {
    background: var(--color-primary, #1A6B72);
    color: #fff;
    border-bottom-right-radius: 4px;
  }
  .bubble-agent {
    background: var(--color-accent, #A8D5DA);
    color: var(--color-text, #2C2C2C);
    border-bottom-left-radius: 4px;
  }

  /* Input row */
  .input-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px 12px;
    border-top: 1.5px solid var(--color-accent, #A8D5DA);
    flex-shrink: 0;
  }
  .chat-input {
    flex: 1;
    background: #fff;
    border: 1.5px solid var(--color-accent, #A8D5DA);
    border-radius: 12px;
    padding: 10px 13px;
    font-size: 14px;
    font-family: var(--font-vazir, inherit);
    color: var(--color-text, #2C2C2C);
    outline: none;
    transition: border-color .18s;
    direction: rtl;
  }
  .chat-input:focus { border-color: var(--color-primary, #1A6B72); }
  .chat-input:focus-visible { outline: 2px solid var(--color-secondary, #C49A3C); outline-offset: 2px; }
  .chat-input:disabled { opacity: .5; cursor: not-allowed; }
  .send-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: var(--color-primary, #1A6B72);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background .18s, transform .15s;
  }
  .send-btn:hover { background: #145459; transform: scale(1.05); }
  .send-btn:disabled { opacity: .45; cursor: not-allowed; transform: none; }
  .send-btn:focus-visible { outline: 2px solid var(--color-secondary, #C49A3C); outline-offset: 2px; }
  .start-btn { background: var(--color-cta, #D4706A); }
  .start-btn:hover { background: #C25E58; }

  /* ─────────── KEYFRAMES ─────────── */
  @keyframes ring-pulse {
    0%   { opacity: 0;    transform: scale(.88); }
    40%  { opacity: .5; }
    100% { opacity: 0;    transform: scale(1.08); }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: .35; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .spin-icon { animation: spin .9s linear infinite; }

  /* ─────────── RESPONSIVE — mobile bottom sheet ─────────── */
  @media (max-width: 640px) {
    .widget-root {
      left: 0;
      right: 0;
      bottom: 0;
      align-items: stretch;
    }
    .trigger-btn {
      position: fixed;
      bottom: 16px;
      left: 16px;
    }
    .widget-panel {
      width: 100vw;
      height: 75vh;
      border-radius: 22px 22px 0 0;
      animation: slide-up .3s cubic-bezier(.22,.61,.36,1) both;
    }
    .drag-handle { display: flex; }
  }
  @keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`;
