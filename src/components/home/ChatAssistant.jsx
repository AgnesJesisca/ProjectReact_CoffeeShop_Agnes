export default function ChatAssistant({ chatOpen, setChatOpen, chatInput, setChatInput, chatMessages, handleChatSend }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {chatOpen && (
        <div className="mb-4 w-80 rounded-3xl overflow-hidden border" style={{ backgroundColor: "#FFFFFF", borderColor: "#F0E6DA", boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: "#6F4E37" }}>
            <div className="flex items-center gap-2">
              <span className="text-lg">☕</span>
              <div>
                <h4 className="text-sm font-bold text-white">El-Coffee Assistant</h4>
                <p className="text-[10px]" style={{ color: "#F5E6D8" }}>Online — Siap membantu</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white text-xl font-bold leading-none hover:opacity-70">&times;</button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: "260px", backgroundColor: "#FFF8F2" }}>
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed"
                  style={msg.sender === "user"
                    ? { backgroundColor: "#6F4E37", color: "#FFFFFF", borderBottomRightRadius: "4px" }
                    : { backgroundColor: "#FFFFFF", color: "#2E1F17", border: "1px solid #F0E6DA", borderBottomLeftRadius: "4px" }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 p-4 border-t" style={{ borderColor: "#F0E6DA" }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
              placeholder="Ketik pesan..."
              className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
              style={{ backgroundColor: "#FFF8F2", border: "1.5px solid #F0E6DA", color: "#2E1F17" }}
            />
            <button onClick={handleChatSend} className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ backgroundColor: "#6F4E37" }}>
              Kirim
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white shadow-xl transition-all hover:scale-105"
        style={{ backgroundColor: "#6F4E37" }}
        aria-label="Buka chat assistant"
      >
        {chatOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}
