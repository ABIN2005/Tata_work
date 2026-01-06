import React, { useState } from 'react';
import { Bot, User, Sparkles, ShieldCheck, Cpu, Send, Loader2 } from 'lucide-react';

// Local demo knowledge base (no network required)
const demoAnswers = [
  {
    match: ['login', 'sign in', 'credentials'],
    reply: 'Demo login: username **0000**, password **0000**. If demo access is enabled, you can browse without signing in.',
  },
  {
    match: ['mock', 'demo data', 'sample', 'fake'],
    reply: 'This chatbot runs fully offline with demo data. Set `VITE_USE_MOCK_DATA=true` in `.env` to keep everything local.',
  },
  {
    match: ['api', 'backend', 'server'],
    reply: 'API calls are routed through the central client. In demo mode, responses come from local mock data—no backend needed.',
  },
  {
    match: ['alerts', 'health', 'status'],
    reply: 'Current demo health: Overall 87%, Active Alerts: 12, Maintenance Due: 5. These are sample values from mock data.',
  },
  {
    match: ['logout', 'sign out'],
    reply: 'Use the user menu or the sign-out page. In demo mode, browsing works even without logging in.',
  },
];

const quickPrompts = [
  'How do I log in for the demo?',
  'Show me current system health',
  'How is mock data configured?',
  'Explain the API client briefly',
];

const getDemoReply = (question) => {
  const q = question.toLowerCase();
  for (const item of demoAnswers) {
    if (item.match.some((m) => q.includes(m))) {
      return item.reply;
    }
  }
  return "Here’s a quick demo overview: I’m running offline with mock data. Ask me about login, mock data, or system health.";
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Hello! I’m your DAMSBF demo assistant. Ask me about login, mock data, or system status.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Simulated response (offline)
    setTimeout(() => {
      const botReply = getDemoReply(text);
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setLoading(false);
    }, 400);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-[2fr_1fr] gap-4">
        {/* Chat panel */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-6 h-[640px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <Sparkles size={18} className="text-cyan-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-tight">DAMSBF Demo Assistant</h2>
              <p className="text-xs text-slate-200/80">Offline, mock-data responses. No API key required.</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-500/70">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <Bot size={18} className="mt-1 text-cyan-300 shrink-0" />}
                <div
                  className={`px-4 py-2 rounded-xl text-sm max-w-[75%] leading-relaxed ${
                    msg.sender === 'bot'
                      ? 'bg-gradient-to-r from-cyan-800 to-cyan-700 text-white shadow-lg'
                      : 'bg-emerald-500 text-white shadow-md'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && <User size={18} className="mt-1 text-emerald-200 shrink-0" />}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-cyan-200 text-sm">
                <Loader2 className="animate-spin" size={16} />
                Thinking...
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 rounded-full px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about the demo (e.g., login, mock data, health)..."
            />
            <button
              onClick={handleSend}
              className="bg-cyan-600 hover:bg-cyan-700 transition text-white px-4 py-2 rounded-full disabled:opacity-60 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              {loading ? 'Sending' : 'Send'}
            </button>
          </div>
        </div>

        {/* Info & quick prompts */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-6 space-y-4 h-[640px]">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <ShieldCheck size={22} className="text-emerald-200" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Offline demo mode</h3>
              <p className="text-xs text-slate-200/80">Responses are local; no network needed.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
              <Cpu size={22} className="text-indigo-200" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Mock data ready</h3>
              <p className="text-xs text-slate-200/80">Set `VITE_USE_MOCK_DATA=true` for full offline experience.</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Quick prompts</h4>
            <div className="grid gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-200/70">
            Tips:
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Ask about login, mock data, API, or health.</li>
              <li>No API key needed; everything is local.</li>
              <li>Use demo credentials: 0000 / 0000.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;