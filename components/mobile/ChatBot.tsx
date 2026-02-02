"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Mic, 
  Languages,
  Clock,
  FileText,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatBotProps {
  onClose: () => void;
  language: 'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa';
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const text = {
  en: {
    title: 'SafeClaim Assistant',
    subtitle: 'AI-powered support available 24/7',
    placeholder: 'Type your message...',
    send: 'Send',
    voice: 'Voice input',
    connecting: 'Connecting to human agent...',
    suggestions: {
      documents: 'What documents do I need?',
      status: 'Check my claim status',
      upload: 'Help with document upload',
      fraud: 'Why was my claim flagged?',
      payout: 'When will I receive payment?',
      contact: 'Talk to human agent'
    },
    botResponses: {
      greeting: 'Hello! I\'m your SafeClaim assistant. How can I help you today?',
      documents: 'For motor insurance claims, you\'ll need: Vehicle damage photos, RC book, driving license, and repair estimate. Would you like me to guide you through the upload process?',
      status: 'I can help you check your claim status. Please provide your claim ID (e.g., CLM12345) or I can look it up using your policy number.',
      upload: 'I\'ll guide you step by step:\n1. Take clear photos in good lighting\n2. Ensure all document text is readable\n3. Upload in JPEG/PDF format\n4. Maximum 5MB per file\n\nWhich document are you having trouble with?',
      fraud: 'Claims are flagged for manual review when our AI detects inconsistencies or missing information. Common reasons include:\n• Missing required documents\n• Image quality issues\n• Inconsistent information\n\nThis is for your protection and usually resolves within 24-48 hours.',
      payout: 'Auto-approved claims are processed within 1-2 hours. Flagged claims take 24-48 hours after manual review. You\'ll receive SMS and email notifications when payment is initiated.',
      default: 'I understand your question. Let me connect you with a human agent who can provide more specific assistance.',
      human: 'Connecting you to our support team. Please wait while I find an available agent...'
    }
  },
  hi: {
    title: 'SafeClaim सहायक',
    subtitle: '24/7 उपलब्ध AI-संचालित सहायता',
    placeholder: 'अपना संदेश टाइप करें...',
    send: 'भेजें',
    voice: 'आवाज इनपुट',
    connecting: 'मानव एजेंट से जुड़ रहे हैं...',
    suggestions: {
      documents: 'मुझे कौन से दस्तावेज़ चाहिए?',
      status: 'मेरे दावे की स्थिति जांचें',
      upload: 'दस्तावेज़ अपलोड में सहायता',
      fraud: 'मेरा दावा क्यों फ्लैग किया गया?',
      payout: 'मुझे भुगतान कब मिलेगा?',
      contact: 'मानव एजेंट से बात करें'
    },
    botResponses: {
      greeting: 'नमस्ते! मैं आपका SafeClaim सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
      documents: 'मोटर बीमा दावों के लिए, आपको चाहिए: वाहन क्षति की तस्वीरें, RC बुक, ड्राइविंग लाइसेंस, और मरम्मत अनुमान। क्या आप चाहेंगे कि मैं अपलोड प्रक्रिया में आपका मार्गदर्शन करूं?',
      status: 'मैं आपके दावे की स्थिति जांचने में मदद कर सकता हूं। कृपया अपना दावा ID (जैसे CLM12345) प्रदान करें या मैं आपके पॉलिसी नंबर से इसे खोज सकता हूं।',
      upload: 'मैं आपको चरणबद्ध तरीके से मार्गदर्शन दूंगा:\n1. अच्छी रोशनी में स्पष्ट तस्वीरें लें\n2. सुनिश्चित करें कि सभी दस्तावेज़ का टेक्स्ट पढ़ने योग्य है\n3. JPEG/PDF फॉर्मेट में अपलोड करें\n4. प्रति फ़ाइल अधिकतम 5MB\n\nआपको किस दस्तावेज़ में समस्या है?',
      fraud: 'जब हमारी AI असंगतताएं या गुम जानकारी का पता लगाती है तो दावों को मैनुअल समीक्षा के लिए फ्लैग किया जाता है। सामान्य कारण:\n• आवश्यक दस्तावेज़ गायब\n• छवि गुणवत्ता की समस्याएं\n• असंगत जानकारी\n\nयह आपकी सुरक्षा के लिए है और आमतौर पर 24-48 घंटों में हल हो जाता है।',
      payout: 'स्वचालित रूप से स्वीकृत दावों को 1-2 घंटे में प्रोसेस किया जाता है। फ्लैग किए गए दावों को मैनुअल समीक्षा के बाद 24-48 घंटे लगते हैं। भुगतान शुरू होने पर आपको SMS और ईमेल सूचनाएं मिलेंगी।',
      default: 'मैं आपका प्रश्न समझता हूं। मुझे आपको एक मानव एजेंट से जोड़ने दें जो अधिक विशिष्ट सहायता प्रदान कर सकता है।',
      human: 'आपको हमारी सहायता टीम से जोड़ रहा हूं। कृपया प्रतीक्षा करें जबकि मैं एक उपलब्ध एजेंट ढूंढता हूं...'
    }
  }
};

export function ChatBot({ onClose, language }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const t = (text as Record<string, typeof text['en']>)[language] ?? text.en;

  const quickSuggestions = Object.values(t.suggestions);

  useEffect(() => {
    // Initial greeting
    const greeting: Message = {
      id: '1',
      text: t.botResponses.greeting,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3)
    };
    setMessages([greeting]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const getBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let responseText = t.botResponses.default;
    let suggestions: string[] = [];

    if (input.includes('document') || input.includes('दस्तावेज़')) {
      responseText = t.botResponses.documents;
      suggestions = [t.suggestions.upload, t.suggestions.status];
    } else if (input.includes('status') || input.includes('स्थिति')) {
      responseText = t.botResponses.status;
      suggestions = [t.suggestions.documents, t.suggestions.payout];
    } else if (input.includes('upload') || input.includes('अपलोड')) {
      responseText = t.botResponses.upload;
      suggestions = [t.suggestions.documents, t.suggestions.contact];
    } else if (input.includes('flag') || input.includes('fraud') || input.includes('फ्लैग')) {
      responseText = t.botResponses.fraud;
      suggestions = [t.suggestions.upload, t.suggestions.contact];
    } else if (input.includes('payment') || input.includes('payout') || input.includes('भुगतान')) {
      responseText = t.botResponses.payout;
      suggestions = [t.suggestions.status, t.suggestions.contact];
    } else if (input.includes('human') || input.includes('agent') || input.includes('मानव')) {
      responseText = t.botResponses.human;
      setIsConnecting(true);
      setTimeout(() => setIsConnecting(false), 3000);
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed inset-0 bg-black/50 flex items-end justify-center p-4 z-50"
    >
      <Card className="w-full max-w-sm h-[600px] flex flex-col bg-white rounded-t-2xl">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-xs opacity-90">{t.subtitle}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {isConnecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm"
            >
              <Clock className="w-4 h-4 animate-spin" />
              {t.connecting}
            </motion.div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                  </div>
                  
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick suggestions */}
          {messages.length > 0 && messages[messages.length - 1].suggestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2"
            >
              {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs h-8 px-3"
                >
                  {suggestion}
                </Button>
              ))}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.placeholder}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-auto"
              >
                <Mic className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
            <Button
              onClick={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
              size="sm"
              className="px-3"
              style={{ backgroundColor: '#0057B7' }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}