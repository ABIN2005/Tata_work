import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Sparkles, ShieldCheck, Cpu, Send, Loader2, Copy, Check, X, Zap, MessageSquare } from 'lucide-react';

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
  { text: 'What is DAMSBF?', icon: '💡' },
  { text: 'How do I log in?', icon: '🔐' },
  { text: 'Show me system health', icon: '📊' },
  { text: 'What are the features?', icon: '✨' },
  { text: 'How do I navigate?', icon: '🗺️' },
  { text: 'Tell me about the team', icon: '👥' },
];

// Format markdown-like text
const formatMessage = (text) => {
  return text
    .split('\n')
    .map((line, idx) => {
      // Bold text
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Code blocks
      line = line.replace(/`(.*?)`/g, '<code class="bg-white/20 px-1.5 py-0.5 rounded text-cyan-200 font-mono text-xs">$1</code>');
      return line;
    })
    .join('\n');
};

const getDemoReply = (question) => {
  const q = question.toLowerCase();
  for (const item of demoAnswers) {
    if (item.match.some((m) => q.includes(m))) {
      return item.reply;
    }
  }
  return "Here's a quick demo overview: I'm running offline with mock data. Ask me about login, mock data, or system health.";
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: '👋 Hi! I\'m your DAMSBF assistant. I can help you with:\n\n• Login & navigation\n• System status & health\n• Equipment information\n• Features & capabilities\n• Team details\n• Technical questions\n\nWhat would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    const userMsg = { 
      sender: 'user', 
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const botReply = getDemoReply(text);
      setMessages((prev) => [...prev, { 
        sender: 'bot', 
        text: botReply,
        timestamp: new Date(),
      }]);
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

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-[1.8fr_1fr] gap-4">
        {/* Chat panel */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 h-[700px] flex flex-col relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5 animate-pulse pointer-events-none" />
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 relative z-10 pb-4 border-b border-white/10">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 border-2 border-cyan-400/50 flex items-center justify-center shadow-lg">
              <Sparkles size={20} className="text-cyan-300 animate-pulse" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold leading-tight bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                DAMSBF Assistant
              </h2>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Online • Ready to help
              </p>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent relative z-10">
            {messages.map((msg, idx) => {
              const msgId = `${msg.sender}-${idx}`;
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 animate-fadeIn ${
                    isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Avatar */}
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      isUser
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg'
                        : 'bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg'
                    }`}
                  >
                    {isUser ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div className={`flex flex-col gap-1 max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`group relative px-4 py-3 rounded-2xl ${
                        isUser
                          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg rounded-br-sm'
                          : 'bg-gradient-to-br from-slate-700/90 to-slate-800/90 text-slate-100 shadow-lg rounded-bl-sm border border-white/10'
                      }`}
                    >
                      <div
                        className="text-sm leading-relaxed whitespace-pre-wrap break-words"
                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                      />
                      
                      {/* Copy button */}
                      <button
                        onClick={() => handleCopy(msg.text, msgId)}
                        className={`absolute top-2 ${
                          isUser ? 'left-2' : 'right-2'
                        } opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-black/20 hover:bg-black/40`}
                        title="Copy message"
                      >
                        {copiedId === msgId ? (
                          <Check size={14} className="text-emerald-300" />
                        ) : (
                          <Copy size={14} className="text-slate-300" />
                        )}
                      </button>
                    </div>
                    
                    {/* Timestamp */}
                    <span className="text-xs text-slate-400 px-2">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {/* Typing indicator */}
            {loading && (
              <div className="flex items-start gap-3 animate-fadeIn">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-gradient-to-br from-slate-700/90 to-slate-800/90 px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10 shadow-lg">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="relative z-10">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  className="w-full rounded-2xl px-4 py-3 pr-12 text-black bg-white/95 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none min-h-[48px] max-h-[120px] text-sm"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSendClick();
                    }
                  }}
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                  rows={1}
                />
                <div className="absolute right-3 bottom-3 text-xs text-slate-500">
                  {input.length > 0 && `${input.length} chars`}
                </div>
              </div>
              <button
                onClick={onSendClick}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 transition-all text-white px-5 py-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span className="hidden sm:inline">Sending</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span className="hidden sm:inline">Send</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
              <span>💡 Tip: Ask about login, navigation, or system status</span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 space-y-5 h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/50">
          {/* Status cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-400/30">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center">
                <ShieldCheck size={20} className="text-emerald-200" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Offline Mode</h3>
                <p className="text-xs text-slate-300">Local responses</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 border border-indigo-400/30">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/30 border border-indigo-400/50 flex items-center justify-center">
                <Cpu size={20} className="text-indigo-200" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Mock Data</h3>
                <p className="text-xs text-slate-300">Demo responses</p>
              </div>
            </div>
          </div>

          {/* Quick prompts */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-cyan-400" />
              <h4 className="text-sm font-semibold">Quick Prompts</h4>
            </div>
            <div className="grid gap-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className="text-left w-full px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-all hover:border-cyan-400/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {prompt.icon}
                  </span>
                  <span className="flex-1">{prompt.text}</span>
                  <MessageSquare size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-400" />
              Tips
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Ask about login, navigation, or features</li>
              <li>Use quick prompts for faster responses</li>
              <li>Copy messages by hovering over them</li>
              <li>Demo credentials: 0000 / 0000</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.7);
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
