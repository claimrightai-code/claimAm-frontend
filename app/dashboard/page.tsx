import { Dashboard } from "@/../../components/Dashboard";


interface DashboardProps {
  onNavigate: (screen: string) => void;
  language: 'english' | 'pidgin';
  onConfetti: () => void;
}
const DasboardPage = ({ onNavigate, language, onConfetti }: DashboardProps) => {
  return <Dashboard onNavigate={onNavigate} language={language} onConfetti={onConfetti} />;
};

export default DasboardPage;