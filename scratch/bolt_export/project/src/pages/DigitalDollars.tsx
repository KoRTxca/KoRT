import { Header } from '../components/Header';
import { ExternalLink, Zap, Shield } from 'lucide-react';

interface App {
  name: string;
  category: string;
  estimatedEarn: string;
  kortAffiliate: boolean;
  quickStack?: boolean;
}

const APPS: App[] = [
  { name: 'Swagbucks', category: 'Surveys + Tasks', estimatedEarn: '$5-15/mo', kortAffiliate: true, quickStack: true },
  { name: 'Mistplay', category: 'Mobile Games', estimatedEarn: '$10-20/mo', kortAffiliate: true, quickStack: true },
  { name: 'Nielsen', category: 'Background Data', estimatedEarn: '$50/yr passive', kortAffiliate: true, quickStack: true },
  { name: 'KOHO', category: 'Banking', estimatedEarn: '$30-60 signup', kortAffiliate: true },
  { name: 'EQ Bank', category: 'Banking', estimatedEarn: '$20-40 signup', kortAffiliate: true },
  { name: 'Tangerine', category: 'Banking', estimatedEarn: '$50-150 signup', kortAffiliate: true },
  { name: 'Neo Financial', category: 'Banking', estimatedEarn: '$25-50 signup', kortAffiliate: true },
  { name: 'Simplii', category: 'Banking', estimatedEarn: '$50-400 signup', kortAffiliate: true },
  { name: 'Rakuten', category: 'Cashback', estimatedEarn: 'Variable', kortAffiliate: true },
  { name: 'Drop', category: 'Cashback', estimatedEarn: 'Variable', kortAffiliate: true },
  { name: 'Microsoft Rewards', category: 'Tasks/Search', estimatedEarn: '$5-15/mo', kortAffiliate: true },
  { name: 'Honeygain', category: 'Passive Data', estimatedEarn: '$2-10/mo', kortAffiliate: true },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Surveys + Tasks': '#27ae60',
  'Mobile Games': '#3498db',
  'Background Data': '#9b59b6',
  'Banking': '#c9a84c',
  'Cashback': '#e67e22',
  'Tasks/Search': '#1abc9c',
  'Passive Data': '#95a5a6',
};

export function DigitalDollars() {
  const quickStackApps = APPS.filter((app) => app.quickStack);

  return (
    <div className="min-h-screen bg-kort-bg">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-cinzel text-4xl text-kort-gold mb-3">Digital Dollars</h1>
          <p className="text-kort-text text-lg">
            Earn real money with 100+ curated apps. All links are KoRT affiliate links.
          </p>
        </div>

        <div className="bg-kort-gold text-kort-bg rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-cinzel text-2xl mb-2">Quick Stack</h2>
              <p className="mb-3">
                Start here → Swagbucks + Mistplay + Nielsen = $15-30 in 48hrs. This covers your first Esquire month.
              </p>
              <div className="flex flex-wrap gap-2">
                {quickStackApps.map((app) => (
                  <span
                    key={app.name}
                    className="bg-kort-bg text-kort-gold px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {app.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPS.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </div>

        <div className="mt-12 bg-kort-bg2 border border-kort-gold rounded-lg p-8">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-kort-gold flex-shrink-0" />
            <div>
              <h3 className="font-cinzel text-xl text-kort-gold mb-2">
                How It Works
              </h3>
              <ul className="space-y-2 text-kort-text">
                <li>• Click "Get Affiliate Link" to access the app through KoRT</li>
                <li>• Sign up and complete the app's requirements</li>
                <li>• Earn real money directly from each platform</li>
                <li>• KoRT earns a small commission to keep the lights on</li>
                <li>• Track your earnings in your Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppCard({ app }: { app: App }) {
  const categoryColor = CATEGORY_COLORS[app.category] || '#888888';

  return (
    <div className="bg-kort-bg2 border border-kort-gold rounded-lg p-6 hover:shadow-[0_0_12px_rgba(201,168,76,0.4)] transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-cinzel text-xl text-kort-gold">{app.name}</h3>
        {app.kortAffiliate && (
          <span className="bg-kort-gold text-kort-bg px-2 py-1 rounded text-xs font-bold">
            KoRT
          </span>
        )}
      </div>

      <div className="mb-4">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-kort-bg"
          style={{ backgroundColor: categoryColor }}
        >
          {app.category}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-kort-muted text-sm mb-1">Estimated Earnings</p>
        <p className="text-kort-text font-bold">{app.estimatedEarn}</p>
      </div>

      <button className="w-full bg-kort-gold text-kort-bg font-bold py-2 rounded hover:bg-kort-gold-light transition-colors flex items-center justify-center gap-2">
        <span>Get Affiliate Link</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}
