import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PartyPopper } from 'lucide-react';

interface ConfettiAlertProps {
  amount: number;
  referrerName: string;
  onClose: () => void;
  onViewWallet: () => void;
}

export function ConfettiAlert({ amount, referrerName, onClose, onViewWallet }: ConfettiAlertProps) {
  const [show, setShow] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  const confettiPieces = [...Array(50)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: -10,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
    color: ['#22c55e', '#3b82f6', '#eab308', '#ef4444', '#a855f7'][Math.floor(Math.random() * 5)],
    rotation: Math.random() * 360,
  }));

  return (
    <div 
      className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Confetti Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.left}%`,
              top: `${piece.top}%`,
              animation: `confetti-fall ${piece.duration}s linear forwards`,
              animationDelay: `${piece.delay}s`,
            }}
          >
            <span
              className="block w-2 h-2 rounded-sm"
              style={{
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Alert Box */}
      <div className={`bg-gradient-to-br from-green-600 to-blue-600 rounded-xl p-6 max-w-md w-full shadow-2xl border-2 border-green-400 relative transition-transform duration-300 ${
        isClosing ? 'scale-95' : 'scale-100'
      }`}>
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 rounded-full p-3 animate-bounce">
            <PartyPopper className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-4">
          <h3 className="text-white text-2xl mb-3">
            Chei! Money Don Enter! 🎉
          </h3>
          <div className="bg-white/20 rounded-lg p-4 mb-3">
            <div className="text-green-200 text-xs mb-1">Referral Commission</div>
            <div className="text-white text-3xl">+₦{amount.toLocaleString()}</div>
          </div>
          <p className="text-green-100 text-base">
            {referrerName} just registered with your code!
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => {
              setIsClosing(true);
              setTimeout(() => {
                onViewWallet();
                onClose();
              }, 300);
            }}
            className="w-full bg-green-400 hover:bg-green-500 text-green-900 py-3 rounded-lg transition-colors text-sm"
          >
            See Wallet
          </button>
          <button
            onClick={() => {
              setIsClosing(true);
              setTimeout(onClose, 300);
            }}
            className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition-colors text-sm"
          >
            Continue
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}