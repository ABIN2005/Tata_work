import React, { useState } from 'react';
import { Box, Fab, Drawer, IconButton, Typography, TextField, Button, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import BotIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: '👋 Hello! I\'m your DAMSBF digital assistant. I can help you with:\n\n• System information\n• Equipment status\n• Navigation help\n• General questions\n\nHow can I assist you today?' 
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Smart fallback responses for common questions
  const getFallbackResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Navigation questions
    if (input.includes('navigate') || input.includes('go to') || input.includes('where') || input.includes('how to access')) {
      return 'You can navigate through the system using the sidebar menu. Key sections include:\n\n• **Blast Furnace (BF1/BF2)** - Monitor blast furnace operations\n• **Caster (C1/C2/C3)** - Track caster systems\n• **BOF (BOF1/BOF2/BOF3)** - Monitor Basic Oxygen Furnace\n• **Furnace Overview** - View overall furnace status\n• **Admin Dashboard** - Access administrative features\n\nUse the menu on the left to explore different sections!';
    }
    
    // About DAMSBF
    if (input.includes('what is') || input.includes('about') || input.includes('damsbf') || input.includes('explain')) {
      return '**DAMSBF** stands for Digital Asset Monitoring System for Blast Furnace. It\'s a comprehensive platform designed for Tata Steel Kalinganagar to:\n\n✅ Monitor equipment status in real-time\n✅ Detect anomalies and predict issues\n✅ Visualize data through interactive dashboards\n✅ Provide AI-powered insights\n✅ Enable efficient problem-solving\n\nVisit the About page to learn more about our team and features!';
    }
    
    // Login/credentials
    if (input.includes('login') || input.includes('password') || input.includes('credential') || input.includes('username')) {
      return '**Login Credentials:**\n\n👤 Username: `0000`\n🔐 Password: `0000`\n\nYou can use these credentials to access the DAMSBF system. Navigate to the login page if you need to sign in.';
    }
    
    // Features
    if (input.includes('feature') || input.includes('what can') || input.includes('capabilities') || input.includes('do')) {
      return 'DAMSBF offers several powerful features:\n\n🤖 **AI Chatbot** - Get instant answers to your questions\n📊 **Real-time Monitoring** - Track equipment status live\n📈 **Data Visualization** - Interactive charts and graphs\n🔔 **Alert System** - Get notified of anomalies\n📱 **Responsive Design** - Works on all devices\n🔒 **Secure Access** - Enterprise-grade security\n\nExplore the different sections to see these features in action!';
    }
    
    // Team/contact
    if (input.includes('team') || input.includes('contact') || input.includes('developer') || input.includes('who made')) {
      return 'DAMSBF was developed by a passionate team including:\n\n• Abhishek Kumar (Project Mentor)\n• Lisa Das (Frontend & Documentation)\n• Advaita Vedanta (Frontend & Backend)\n• Muskan Singh (UI/UX Designer)\n• Krish Kumar (Frontend & Backend)\n• Priyanshu Bhusan (AI Integration)\n• Suvidya Tiwari (UI/UX Designer)\n\nVisit the About page to see the full team and their contributions!';
    }
    
    // Help
    if (input.includes('help') || input.includes('support') || input.includes('stuck')) {
      return 'I\'m here to help! Here are some things I can assist with:\n\n• **Navigation** - Guide you through the system\n• **Features** - Explain DAMSBF capabilities\n• **Login** - Provide credentials\n• **General Questions** - Answer queries about the system\n\n💡 **Tip:** For full AI-powered responses, configure the OpenAI API key in your environment variables.\n\nWhat would you like to know?';
    }
    
    // Default helpful response
    return `I understand your question about "${userInput}". 

While I can provide basic assistance, for detailed AI-powered responses, please configure the OpenAI API key:

**Setup Instructions:**
1. Create a \`.env\` file in the project root
2. Add: \`VITE_OPENAI_API_KEY=your_api_key_here\`
3. Restart the development server

**In the meantime, I can help with:**
• Navigation guidance
• Feature explanations  
• Login credentials
• General DAMSBF information

What specific help do you need?`;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      // Check if OpenAI API key is configured
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        // Use smart fallback responses
        const fallbackResponse = getFallbackResponse(currentInput);
        setTimeout(() => {
          setMessages((prev) => [...prev, { sender: 'bot', text: fallbackResponse }]);
          setLoading(false);
        }, 500); // Small delay to simulate thinking
        return;
      }

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful assistant for a Digital Asset Monitoring System for Blast Furnace (DAMSBF) at Tata Steel Kalinganagar. You help users navigate the system, understand equipment status, and answer questions about the steel plant operations. Be concise and helpful.' 
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: input },
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botReply = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Chat API Error:', error?.response?.status, error?.response?.data);

      let errorMessage = '⚠️ Sorry, something went wrong. Please try again.';
      
      if (error?.response?.status === 401) {
        errorMessage = '⚠️ API authentication failed. Please check your API key configuration.';
      } else if (error?.response?.status === 429) {
        errorMessage = '⚠️ Too many requests. Please wait a moment and try again.';
      } else if (error?.response?.status === 500) {
        errorMessage = '⚠️ Server error. Please try again later.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: errorMessage }]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="chat assistant"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          zIndex: 1000,
          backgroundColor: '#004C97',
          width: { xs: 48, sm: 56 },
          height: { xs: 48, sm: 56 },
          '&:hover': {
            backgroundColor: '#003366',
          },
          boxShadow: '0 4px 12px rgba(0, 76, 151, 0.4)',
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            maxWidth: { xs: '100vw', sm: '90vw' },
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              backgroundColor: '#004C97',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BotIcon />
              <Typography variant="h6" fontWeight="bold">
                Chat Assistant
              </Typography>
            </Box>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{ color: 'white' }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              backgroundColor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: 1,
                }}
              >
                {msg.sender === 'bot' && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mt: 0.5,
                    }}
                  >
                    <BotIcon sx={{ color: '#004C97', fontSize: 20 }} />
                  </Box>
                )}
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 1, sm: 1.5 },
                    maxWidth: { xs: '85%', sm: '75%' },
                    backgroundColor: msg.sender === 'bot' ? '#e3f2fd' : '#004C97',
                    color: msg.sender === 'bot' ? '#000' : '#fff',
                    borderRadius: 2,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}>{msg.text}</Typography>
                </Paper>
                {msg.sender === 'user' && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mt: 0.5,
                    }}
                  >
                    <PersonIcon sx={{ color: '#004C97', fontSize: 20 }} />
                  </Box>
                )}
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
                <BotIcon sx={{ color: '#004C97', fontSize: 20, mt: 0.5 }} />
                <Paper
                  elevation={2}
                  sx={{
                    p: 1.5,
                    backgroundColor: '#e3f2fd',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">Thinking...</Typography>
                </Paper>
              </Box>
            )}
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              backgroundColor: 'white',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              multiline
              maxRows={3}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              sx={{
                minWidth: 'auto',
                backgroundColor: '#004C97',
                '&:hover': {
                  backgroundColor: '#003366',
                },
              }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatAssistant;
