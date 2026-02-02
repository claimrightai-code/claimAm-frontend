"use client";
import { Download, Share2, Copy, CheckCircle, Image, FileText, MessageCircle, Video } from 'lucide-react';
import { useState } from 'react';

interface MarketingKitProps {
  language: 'english' | 'pidgin';
}

export function MarketingKit({ language }: MarketingKitProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const text = {
    english: {
      title: 'Marketing Kit',
      subtitle: 'Download materials to promote ClaimAm',
      flyers: 'Flyers & Posters',
      whatsapp: 'WhatsApp Assets',
      messages: 'Pre-written Messages',
      videos: 'TikTok & Reels Scripts',
      download: 'Download',
      copy: 'Copy',
      copied: 'Copied!',
      share: 'Share',
    },
    pidgin: {
      title: 'Marketing Tins',
      subtitle: 'Download tins wey go help you advertise ClaimAm',
      flyers: 'Flyers & Posters',
      whatsapp: 'WhatsApp Tins',
      messages: 'Messages Wey We Don Write',
      videos: 'TikTok & Reels Scripts',
      download: 'Download',
      copy: 'Copy',
      copied: 'Don Copy!',
      share: 'Share',
    },
  };

  const t = text[language];

  const flyers = [
    {
      title: 'General Insurance Flyer',
      description: 'One-page overview for all insurance types',
      thumbnail: '📄',
      size: '2.3 MB',
      format: 'PDF',
    },
    {
      title: 'Motor Insurance Poster',
      description: 'For okada riders and drivers',
      thumbnail: '🏍️',
      size: '1.8 MB',
      format: 'JPG',
    },
    {
      title: 'Crop Insurance Banner',
      description: 'For farmers and agricultural workers',
      thumbnail: '🌾',
      size: '2.1 MB',
      format: 'PNG',
    },
    {
      title: 'Market Women Flyer',
      description: 'Shop and inventory insurance',
      thumbnail: '🏪',
      size: '1.9 MB',
      format: 'PDF',
    },
  ];

  const whatsappAssets = [
    {
      title: 'Status Images (3 pack)',
      description: 'Eye-catching graphics for WhatsApp status',
      thumbnail: '💚',
      count: 3,
      size: '4.2 MB',
    },
    {
      title: 'Profile Picture Frame',
      description: 'Show you\'re a ClaimAm agent',
      thumbnail: '🎯',
      count: 1,
      size: '0.8 MB',
    },
    {
      title: 'Sticker Pack',
      description: '12 animated stickers',
      thumbnail: '😊',
      count: 12,
      size: '6.5 MB',
    },
  ];

  const messages = [
    {
      title: 'Introduction Message',
      text: '👋 Hello! I\'m a ClaimAm agent. Did you know you can protect your bike, shop, or crops with insurance for as low as ₦500/month? And when something happens, you get paid FAST through *669#. No stress, no long wait. Let me help you!',
    },
    {
      title: 'Farmer Outreach (Pidgin)',
      text: 'Oga/Madam farmer 🌾 Your crops fit spoil because of flood or drought. ClaimAm fit help you! Pay small money every month, if anything happen to your farm, we go pay you quick quick. Even if you no get smartphone, just dial *669# from any phone. Make I register you?',
    },
    {
      title: 'Okada Rider Pitch',
      text: '🏍️ Brother okada! If accident happen tomorrow, wetin you go do? ClaimAm get motor insurance for ₦800/month. If your bike damage, we go pay you repair money sharp sharp. You fit even file claim with *669# - no need smartphone! Make I show you how e work?',
    },
    {
      title: 'Market Woman Appeal',
      text: 'Aunty 🏪 If fire catch your shop or thief carry your goods, you fit recover the money! ClaimAm get insurance for market people like you. Pay ₦1,000 every month, protect your business. If anything happen, dial *669# to claim. Simple! You want make I register you?',
    },
  ];

  const videoScripts = [
    {
      title: 'TikTok Hook (15 seconds)',
      script: '[Show okada rider]\n"This bike is my life. Without it, I no fit feed my family."\n[Show ClaimAm app]\n"That\'s why I insure am with ClaimAm. ₦800/month = Peace of mind"\n[Show USSD *669#]\n"Even my mama wey no get smartphone fit use am! *669#"',
      views: '2.4K',
    },
    {
      title: 'Instagram Reel (30 seconds)',
      script: '[Scene 1: Market on fire]\n"This happened to my neighbor last month. She lost everything."\n[Scene 2: You explaining]\n"With ClaimAm, if e happen to you, you go collect your money back in 48 hours!"\n[Scene 3: USSD demo]\n"Dial *669#, follow the steps, done! Works on any phone."\n[Call to action]\n"DM me to register!"',
      views: '5.1K',
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl text-[#1A1A1A] mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Flyers & Posters */}
      <div className="mb-8">
        <h3 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#00BA00]" />
          {t.flyers}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {flyers.map((flyer, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white hover:shadow-xl transition-shadow">
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-green-100 to-blue-100 rounded-xl mb-4 flex items-center justify-center text-6xl">
                {flyer.thumbnail}
              </div>
              <h4 className="text-[#1A1A1A] mb-1">{flyer.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{flyer.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{flyer.format}</span>
                <span>{flyer.size}</span>
              </div>
              <button className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                {t.download}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Assets */}
      <div className="mb-8">
        <h3 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#00BA00]" />
          {t.whatsapp}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {whatsappAssets.map((asset, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white hover:shadow-xl transition-shadow">
              <div className="w-full h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-4 flex items-center justify-center text-6xl">
                {asset.thumbnail}
              </div>
              <h4 className="text-[#1A1A1A] mb-1">{asset.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{asset.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{asset.count} {asset.count === 1 ? 'file' : 'files'}</span>
                <span>{asset.size}</span>
              </div>
              <button className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                {t.download}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-written Messages */}
      <div className="mb-8">
        <h3 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#00BA00]" />
          {t.messages}
        </h3>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
              <h4 className="text-[#1A1A1A] mb-3 flex items-center gap-2">
                <span>{message.title}</span>
              </h4>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 whitespace-pre-line">{message.text}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(message.text, index)}
                  className="flex-1 bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {copiedIndex === index ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      {t.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {t.copy}
                    </>
                  )}
                </button>
                <button className="px-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  {t.share}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Scripts */}
      <div>
        <h3 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-[#00BA00]" />
          {t.videos}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videoScripts.map((video, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[#1A1A1A]">{video.title}</h4>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {video.views} views avg
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 whitespace-pre-line">{video.script}</p>
              </div>
              <button
                onClick={() => handleCopy(video.script, 100 + index)}
                className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {copiedIndex === 100 + index ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t.copy}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
