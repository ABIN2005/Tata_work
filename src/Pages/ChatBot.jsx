import React, { useState } from 'react';
import { Bot, User, Sparkles, ShieldCheck, Cpu, Send, Loader2 } from 'lucide-react';

// Local demo knowledge base (no network required)
const demoAnswers = [
  // Login & Authentication
  {
    match: ['login', 'sign in', 'credentials', 'username', 'password', 'authenticate', 'access'],
    reply: '🔐 **Login Credentials:**\n\n• Username: `0000`\n• Password: `0000`\n\nNavigate to the login page to access the system. Demo mode allows browsing without login.',
  },
  {
    match: ['logout', 'sign out', 'log out', 'exit'],
    reply: 'To sign out, use the sign-out option from the menu or navigate to `/signout`. In demo mode, you can continue browsing without authentication.',
  },
  
  // System Overview
  {
    match: ['what is', 'about', 'damsbf', 'explain', 'overview', 'introduction'],
    reply: '**DAMSBF** (Digital Asset Monitoring System for Blast Furnace) is a comprehensive platform for Tata Steel Kalinganagar that:\n\n✅ Monitors equipment in real-time\n✅ Detects anomalies and predicts issues\n✅ Provides interactive dashboards\n✅ Offers AI-powered insights\n✅ Enables efficient problem-solving\n\nVisit the About page for more details!',
  },
  {
    match: ['features', 'capabilities', 'what can', 'do', 'functionality'],
    reply: '**DAMSBF Features:**\n\n🤖 AI Chatbot - Instant answers\n📊 Real-time Monitoring - Live equipment status\n📈 Data Visualization - Interactive charts\n🔔 Alert System - Anomaly notifications\n📱 Responsive Design - Works on all devices\n🔒 Secure Access - Enterprise-grade security\n\nExplore different sections to see these in action!',
  },
  
  // Blast Furnace
  {
    match: ['blast furnace', 'bf1', 'bf2', 'furnace', 'blast'],
    reply: '**Blast Furnace Systems:**\n\n• **BF1** - Blast Furnace 1 monitoring dashboard\n• **BF2** - Blast Furnace 2 (Coming Soon)\n\nAccess via: Blast Furnace → BF1/BF2. Monitor temperature, pressure, and operational status in real-time.',
  },
  {
    match: ['tuyere', 'tuyere nose', 'hot blast'],
    reply: '**Furnace Systems:**\n\n• **Tuyere Nose System 1 & 2** - Monitor tuyere conditions\n• **Hot Blast Flow** - Track hot blast furnace operations\n\nNavigate to: Furnace → Tuyere Nose System or Hot Blast Flow',
  },
  
  // Caster
  {
    match: ['caster', 'c1', 'c2', 'c3', 'casting'],
    reply: '**Caster Systems:**\n\n• **C1** - Caster 1 (Coming Soon)\n• **C2** - Caster 2 (Coming Soon)\n• **C3** - Caster 3 (Coming Soon)\n\nThese sections monitor continuous casting operations. Access via the sidebar menu.',
  },
  
  // BOF
  {
    match: ['bof', 'basic oxygen', 'oxygen furnace', 'bof1', 'bof2', 'bof3'],
    reply: '**BOF (Basic Oxygen Furnace) Systems:**\n\n• **BOF1** - Basic Oxygen Furnace 1 (Coming Soon)\n• **BOF2** - Basic Oxygen Furnace 2 (Coming Soon)\n• **BOF3** - Basic Oxygen Furnace 3 (Coming Soon)\n\nMonitor steel melting operations through these sections.',
  },
  
  // Equipment & Status
  {
    match: ['health', 'status', 'overall', 'equipment', 'condition'],
    reply: '**Current System Health (Demo Data):**\n\n📊 Overall Health: **87%**\n🔔 Active Alerts: **12**\n🔧 Maintenance Due: **5**\n✅ Operational Units: **8/10**\n\nVisit "Overall Status" or "Health Status" pages for detailed information.',
  },
  {
    match: ['alerts', 'alert', 'warning', 'notification', 'issue'],
    reply: '**Alert System:**\n\nCurrently showing **12 active alerts** (demo data). Alerts notify you about:\n\n⚠️ Equipment anomalies\n🔧 Maintenance requirements\n📉 Performance deviations\n🚨 Critical issues\n\nCheck the dashboard for detailed alert information.',
  },
  {
    match: ['maintenance', 'repair', 'service', 'schedule'],
    reply: '**Maintenance Status:**\n\n• **5** maintenance tasks due (demo data)\n• Scheduled maintenance tracking available\n• Equipment service history accessible\n\nNavigate to Admin Dashboard for maintenance management.',
  },
  
  // Navigation
  {
    match: ['navigate', 'go to', 'where', 'how to access', 'menu', 'sidebar'],
    reply: '**Navigation Guide:**\n\nUse the **sidebar menu** to access:\n\n🏠 **Home** - Main dashboard\n🔥 **Blast Furnace** - BF1/BF2 monitoring\n🏭 **Caster** - C1/C2/C3 systems\n⚙️ **BOF** - Basic Oxygen Furnace\n📊 **Furnace Overview** - Overall status\n👤 **Admin Dashboard** - Administrative features\n\nClick any menu item to explore!',
  },
  {
    match: ['dashboard', 'home', 'main page'],
    reply: 'The **Home Dashboard** displays:\n\n• Clickable cards for major sections\n• Quick access to Blast Furnace, Caster, and BOF\n• System overview and status\n• Navigation to detailed monitoring pages\n\nUse the cards to navigate to specific sections.',
  },
  
  // Team & About
  {
    match: ['team', 'developer', 'who made', 'created', 'contact', 'about us'],
    reply: '**DAMSBF Development Team:**\n\n👨‍💼 Abhishek Kumar - Project Mentor\n👩‍💻 Lisa Das - Frontend & Documentation\n👨‍💻 Advaita Vedanta - Frontend & Backend\n🎨 Muskan Singh - UI/UX Designer\n👨‍💻 Krish Kumar - Frontend & Backend\n🤖 Priyanshu Bhusan - AI Integration\n🎨 Suvidya Tiwari - UI/UX Designer\n\nVisit the About page to see full team details!',
  },
  
  // API & Technical
  {
    match: ['api', 'backend', 'server', 'endpoint', 'integration'],
    reply: '**API Integration:**\n\n• API calls routed through central client\n• Default endpoint: `http://localhost:8000/api`\n• Token-based authentication (JWT)\n• Mock data fallback available\n• Set `VITE_USE_MOCK_DATA=true` for offline mode\n\nAll API calls are handled centrally for consistency.',
  },
  {
    match: ['mock', 'demo data', 'sample', 'fake', 'test data'],
    reply: '**Mock Data System:**\n\nThis chatbot runs fully offline with demo data.\n\nTo enable mock data mode:\n• Set `VITE_USE_MOCK_DATA=true` in `.env`\n• All API calls will use local mock responses\n• No backend connection required\n• Perfect for development and demos',
  },
  
  // Monitoring & Data
  {
    match: ['monitor', 'track', 'watch', 'observe', 'real-time', 'live'],
    reply: '**Real-time Monitoring:**\n\nDAMSBF provides live monitoring of:\n\n🌡️ Temperature sensors\n📊 Pressure readings\n⚡ Power consumption\n🔧 Equipment status\n📈 Performance metrics\n\nAll data updates in real-time on the dashboards.',
  },
  {
    match: ['data', 'information', 'metrics', 'statistics', 'analytics'],
    reply: '**Data & Analytics:**\n\nAccess various data views:\n\n📊 Interactive charts and graphs\n📈 Historical trends\n📉 Performance analytics\n🔍 Detailed equipment data\n📋 Reports and summaries\n\nNavigate to specific sections for detailed data views.',
  },
  
  // Admin & Settings
  {
    match: ['admin', 'administrator', 'settings', 'configuration', 'manage'],
    reply: '**Admin Dashboard:**\n\nAccess administrative features via:\n• Admin Dashboard menu item\n• User management\n• System configuration\n• Maintenance scheduling\n• Alert management\n\nNavigate to "Admin Dashboard" from the sidebar.',
  },
  
  // Help & Support
  {
    match: ['help', 'support', 'assistance', 'guide', 'how', 'tutorial'],
    reply: '**Help & Support:**\n\nI can help you with:\n\n❓ Login credentials\n🗺️ Navigation guidance\n📊 System status\n🔧 Equipment information\n👥 Team details\n⚙️ Technical questions\n\nJust ask me anything about DAMSBF!',
  },
  {
    match: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
    reply: '👋 **Hello!** I\'m your DAMSBF assistant.\n\nI can help you with:\n• System information\n• Navigation\n• Equipment status\n• Login help\n• General questions\n\nWhat would you like to know?',
  },
  
  // Troubleshooting
  {
    match: ['error', 'problem', 'issue', 'not working', 'broken', 'fix'],
    reply: '**Troubleshooting:**\n\nCommon solutions:\n\n🔐 **Login issues** - Use credentials: 0000 / 0000\n🌐 **Page not loading** - Check browser console (F12)\n📡 **API errors** - Enable mock data mode\n🔄 **Refresh** - Try reloading the page\n\nIf issues persist, check the browser console for error messages.',
  },
  
  // General Responses
  {
    match: ['thanks', 'thank you', 'appreciate'],
    reply: 'You\'re welcome! 😊 Feel free to ask if you need any other help with DAMSBF.',
  },
  {
    match: ['bye', 'goodbye', 'see you', 'exit'],
    reply: '👋 Goodbye! Have a great day. Come back anytime if you need assistance!',
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
    { sender: 'bot', text: '👋 Hi! I’m your DAMSBF demo assistant. Ask me about login, mock data, or system status.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const botReply = getDemoReply(text);
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setLoading(false);
    }, 400);
  };

  const onSendClick = () => {
    const text = input;
    setInput('');
    handleSend(text);
  };

  const handleQuickPrompt = (prompt) => {
    setInput('');
    handleSend(prompt);
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
              onKeyDown={(e) => e.key === 'Enter' && onSendClick()}
              placeholder="Ask me anything about DAMSBF..."
            />
            <button
              onClick={onSendClick}
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
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-left w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-200/70 space-y-2">
            <p>Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Ask about login, navigation, system status, or features.</li>
              <li>No API key needed; everything is local.</li>
              <li>Try: "What is DAMSBF?" or "Show me system health"</li>
              <li>Use demo credentials: 0000 / 0000.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;