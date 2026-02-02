"use client";
import { Send, Phone, Mail, MapPin, MessageCircle, Clock, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SupportChatProps {
  language: 'english' | 'pidgin';
}

export function SupportChat({ language }: SupportChatProps) {
  const [message, setMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const text = {
    english: {
      title: 'Support & Help',
      subtitle: 'We\'re here to help you succeed',
      chat: 'Live Chat with Support',
      faq: 'Frequently Asked Questions',
      contact: 'Contact Information',
      phone: 'Phone Support',
      email: 'Email Support',
      office: 'Lagos Office',
      hours: 'Support Hours',
      hoursDetail: 'Monday - Saturday: 8am - 8pm',
      typeMessage: 'Type your message...',
      send: 'Send',
    },
    pidgin: {
      title: 'Support & Help',
      subtitle: 'We dey here to help you',
      chat: 'Talk to Support Now',
      faq: 'Questions Wey People Dey Ask',
      contact: 'Contact Information',
      phone: 'Call Us',
      email: 'Email Us',
      office: 'Lagos Office',
      hours: 'Support Hours',
      hoursDetail: 'Monday - Saturday: 8am - 8pm',
      typeMessage: 'Write your message...',
      send: 'Send',
    },
  };

  const t = text[language];

  const chatMessages = [
    {
      sender: 'support',
      text: 'Hello Chukwudi! 👋 Welcome to ClaimAm support. How can I help you today?',
      time: '10:23 AM',
      avatar: '👨‍💼',
    },
    {
      sender: 'user',
      text: 'Hi! I need help understanding how claim commissions work.',
      time: '10:24 AM',
      avatar: '👤',
    },
    {
      sender: 'support',
      text: 'Great question! When you help a user file a claim and it gets approved, you earn ₦1,500 commission. The money is added to your wallet within 24 hours of claim approval. Would you like me to walk you through an example?',
      time: '10:25 AM',
      avatar: '👨‍💼',
    },
  ];

  const faqs = [
    {
      question: 'How do I earn money as an agent?',
      answer: 'You earn in 3 ways: (1) ₦200 for each user you onboard, (2) ₦1,500 commission when a user files a successful claim, (3) ₦500 for each agent you refer who becomes active.',
    },
    {
      question: 'When will I receive my commission?',
      answer: 'Referral bonuses (₦200) are instant. Claim commissions (₦1,500) are added within 24 hours of claim approval. You can withdraw anytime your balance is above ₦1,000.',
    },
    {
      question: 'What if a user has a problem with their claim?',
      answer: 'First, check the claim status in your dashboard. If it\'s pending, it\'s being processed. If rejected, there\'s usually a reason shown. You can escalate difficult cases to us through this support chat.',
    },
    {
      question: 'Can I work as an agent part-time?',
      answer: 'Absolutely! Most of our top agents work part-time. You set your own hours and work at your own pace. The more effort you put in, the more you earn.',
    },
    {
      question: 'How does the USSD *669# work?',
      answer: 'Users dial *669# from any phone (smartphone not required). They follow simple prompts to file claims, check status, or register. This is our biggest advantage - reaching Nigerians without internet access.',
    },
    {
      question: 'What happens if I refer an agent who doesn\'t become active?',
      answer: 'You only earn the ₦500 referral bonus once your referred agent successfully onboards their first 3 users. This ensures we reward quality referrals.',
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage('');
    }
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl text-[#1A1A1A] mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section - Takes 2 columns on desktop */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white overflow-hidden">
            <div className="bg-gradient-to-r from-[#00BA00] to-[#00C853] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <h3 className="text-lg">{t.chat}</h3>
                  <p className="text-sm opacity-90">Usually replies in minutes</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse" />
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00BA00] to-[#00C853] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {msg.sender === 'support' ? '👨‍💼' : '👤'}
                  </div>
                  <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`inline-block max-w-md p-4 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-[#00BA00] text-white'
                          : 'bg-white shadow-lg'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.typeMessage}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00BA00] focus:outline-none transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 bg-[#00BA00] hover:bg-[#00C853] text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
            <h3 className="text-lg text-[#1A1A1A] mb-4">{t.contact}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#00BA00] mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t.phone}</p>
                  <p className="text-[#1A1A1A]">0800-CLAIM-AM</p>
                  <p className="text-[#1A1A1A]">+234 800 252 4626</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#00BA00] mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t.email}</p>
                  <p className="text-[#1A1A1A]">agents@claimam.ng</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00BA00] mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t.office}</p>
                  <p className="text-[#1A1A1A]">23 Admiralty Way,</p>
                  <p className="text-[#1A1A1A]">Lekki Phase 1, Lagos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#00BA00] mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t.hours}</p>
                  <p className="text-[#1A1A1A]">{t.hoursDetail}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
            <HelpCircle className="w-8 h-8 mb-3" />
            <h4 className="text-lg mb-2">Quick Help</h4>
            <p className="text-sm opacity-90 mb-4">
              Need urgent help? Call our 24/7 emergency hotline for critical issues.
            </p>
            <button className="w-full bg-white text-blue-600 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Call Emergency Line
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
        <h3 className="text-lg text-[#1A1A1A] mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#00BA00]" />
          {t.faq}
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-[#1A1A1A]">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4 pt-2 bg-gray-50">
                  <p className="text-sm text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
