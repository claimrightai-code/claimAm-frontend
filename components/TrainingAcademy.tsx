"use client";
import { Play, CheckCircle, Lock, Award, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface TrainingAcademyProps {
  language: 'english' | 'pidgin';
}

export function TrainingAcademy({ language }: TrainingAcademyProps) {
  const [completedModules, setCompletedModules] = useState<number[]>([0, 1, 2]);

  const text = {
    english: {
      title: 'Training Academy',
      subtitle: 'Learn & Earn ₦100 per module',
      progress: 'Your Progress',
      completed: 'Completed',
      inProgress: 'In Progress',
      locked: 'Locked',
      watchVideo: 'Watch Video',
      takeQuiz: 'Take Quiz',
      earnCredit: 'Earn ₦100',
      duration: 'min',
      congratulations: 'Congratulations!',
      earnedMessage: 'You earned ₦100 wallet credit',
    },
    pidgin: {
      title: 'Training Academy',
      subtitle: 'Learn & Collect ₦100 for every module',
      progress: 'Your Progress',
      completed: 'Don Finish',
      inProgress: 'Dey Do',
      locked: 'Lock',
      watchVideo: 'Watch Video',
      takeQuiz: 'Do Quiz',
      earnCredit: 'Collect ₦100',
      duration: 'min',
      congratulations: 'Congrats!',
      earnedMessage: 'You don collect ₦100 for wallet',
    },
  };

  const t = text[language];

  const modules = [
    {
      id: 0,
      title: 'Introduction to ClaimAm',
      description: 'Learn how ClaimAm works and how you can help users',
      duration: 3,
      thumbnail: '🎓',
      quiz: ['What is ClaimAm?', 'Who can use ClaimAm?', 'How do agents earn?'],
    },
    {
      id: 1,
      title: 'Onboarding Users in Pidgin',
      description: 'Master the art of explaining insurance to everyday Nigerians',
      duration: 5,
      thumbnail: '🗣️',
      quiz: ['How to explain insurance simply', 'Common objections', 'USSD demonstration'],
    },
    {
      id: 2,
      title: 'Filing Claims for Farmers',
      description: 'Help crop and poultry farmers document losses and get paid',
      duration: 7,
      thumbnail: '🌾',
      quiz: ['Required documents', 'Photo evidence', 'Timeline expectations'],
    },
    {
      id: 3,
      title: 'Motor Insurance Claims',
      description: 'Guide okada riders and drivers through accident claims',
      duration: 6,
      thumbnail: '🏍️',
      quiz: ['Accident documentation', 'Police reports', 'Vehicle inspection'],
    },
    {
      id: 4,
      title: 'Health Insurance Basics',
      description: 'Explain health coverage and help users file medical claims',
      duration: 5,
      thumbnail: '🏥',
      quiz: ['Coverage types', 'Hospital partnerships', 'Pre-authorization'],
    },
    {
      id: 5,
      title: 'Advanced: Market Women & Shop Owners',
      description: 'Sell business insurance to traders and small business owners',
      duration: 8,
      thumbnail: '🏪',
      quiz: ['Business risks', 'Inventory protection', 'Fire insurance'],
    },
    {
      id: 6,
      title: 'Handling Difficult Situations',
      description: 'Resolve disputes and manage angry customers professionally',
      duration: 10,
      thumbnail: '💪',
      quiz: ['De-escalation', 'When to escalate', 'Building trust'],
    },
    {
      id: 7,
      title: 'Recruiting Sub-Agents',
      description: 'Build your team and earn from their commissions',
      duration: 6,
      thumbnail: '👥',
      quiz: ['Finding agents', 'Training sub-agents', 'Team motivation'],
    },
  ];

  const progressPercentage = (completedModules.length / modules.length) * 100;

  const getModuleStatus = (id: number) => {
    if (completedModules.includes(id)) return 'completed';
    if (id === 0 || completedModules.includes(id - 1)) return 'available';
    return 'locked';
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl text-[#1A1A1A] mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 mb-8 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-90 mb-2">{t.progress}</p>
            <p className="text-4xl">{completedModules.length}/{modules.length} {t.completed}</p>
          </div>
          <Award className="w-16 h-16 opacity-80" />
        </div>
        <div className="w-full bg-white/20 rounded-full h-4 mb-4">
          <div
            className="bg-white rounded-full h-4 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm opacity-90">
          {completedModules.length * 100} ₦ earned from training • Keep going!
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => {
          const status = getModuleStatus(module.id);
          const isCompleted = status === 'completed';
          const isLocked = status === 'locked';

          return (
            <div
              key={module.id}
              className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white transition-all ${
                isLocked ? 'opacity-60' : 'hover:shadow-xl'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg ${
                  isCompleted ? 'bg-green-100' : isLocked ? 'bg-gray-100' : 'bg-blue-100'
                }`}>
                  {isCompleted ? '✅' : isLocked ? '🔒' : module.thumbnail}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg text-[#1A1A1A]">{module.title}</h3>
                    {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {module.duration} {t.duration}
                    </span>
                    <span>•</span>
                    <span>{module.quiz.length} quiz questions</span>
                  </div>
                </div>
              </div>

              {isCompleted ? (
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-sm text-green-700">Module completed • ₦100 earned</p>
                </div>
              ) : isLocked ? (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-sm text-gray-600">Complete previous modules to unlock</p>
                </div>
              ) : (
                <button className="w-full bg-[#00BA00] hover:bg-[#00C853] text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                  <Play className="w-5 h-5" />
                  {t.watchVideo}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-[#00BA00]" />
          <h3 className="text-lg text-[#1A1A1A]">Training Tips</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#00BA00]">•</span>
            <span className="text-gray-700">Watch videos in a quiet place to focus better</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00BA00]">•</span>
            <span className="text-gray-700">Practice with friends before helping real users</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00BA00]">•</span>
            <span className="text-gray-700">You can retake quizzes unlimited times</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00BA00]">•</span>
            <span className="text-gray-700">Complete all modules to unlock Advanced Agent badge</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
