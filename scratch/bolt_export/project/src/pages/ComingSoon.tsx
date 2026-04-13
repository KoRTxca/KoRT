import { Header } from '../components/Header';
import { ArrowRight, Zap, MessageCircle, Shield } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export function ComingSoon({ title, description, features }: ComingSoonProps) {
  const iconMap: Record<string, React.ReactNode> = {
    advocate: <MessageCircle className="w-24 h-24" />,
    detox: <Zap className="w-24 h-24" />,
    dispatch: <Shield className="w-24 h-24" />,
  };

  return (
    <div className="min-h-screen bg-kort-bg">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-kort-bg2 border border-kort-gold rounded-lg p-12 text-center">
          <div className="text-kort-gold mb-6 flex justify-center">{iconMap[title.toLowerCase()] || <Zap className="w-24 h-24" />}</div>

          <h1 className="font-cinzel text-5xl text-kort-gold mb-4">{title}</h1>
          <p className="text-kort-text text-xl mb-8 max-w-2xl mx-auto">{description}</p>

          <div className="inline-block bg-kort-gold text-kort-bg px-6 py-3 rounded-full font-bold text-lg mb-8">
            Coming Soon
          </div>

          <div className="my-12 border-t border-kort-gold/30 pt-12">
            <h2 className="font-cinzel text-2xl text-kort-gold mb-6">What's Coming</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-kort-gold mt-0.5 flex-shrink-0" />
                  <span className="text-kort-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 bg-kort-bg border border-kort-muted rounded-lg">
            <p className="text-kort-muted">
              Stay tuned for the official launch. Sign up for updates at{' '}
              <a href="mailto:updates@kortx.ca" className="text-kort-gold hover:text-kort-gold-light">
                updates@kortx.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
