import { Link } from 'react-router-dom';
import { Shield, Check, TrendingUp } from 'lucide-react';

const TIERS = [
  {
    name: 'Page',
    monthly: 5,
    annual: 50,
    color: '#555',
    features: [
      'Updates & announcements',
      'Discord community access',
      'Early beta access',
      'KoRT newsletter',
    ],
  },
  {
    name: 'Esquire',
    monthly: 15,
    annual: 150,
    color: '#1a3a6b',
    features: [
      'All Page benefits',
      'Full community access',
      'Transparent ledger access',
      'Microloan eligible',
      'Priority support',
    ],
  },
  {
    name: 'Knight',
    monthly: 50,
    annual: 500,
    color: '#c9a84c',
    features: [
      'All Esquire benefits',
      'Monthly strategy calls',
      'Professional network',
      'Faster microloan processing',
      'Governance participation',
    ],
    popular: true,
  },
  {
    name: 'Round Table',
    monthly: 150,
    annual: 1500,
    color: '#8b0000',
    features: [
      'All Knight benefits',
      'Voting rights on proposals',
      'Co-founder status',
      'Equity path eligibility',
      'Direct founder access',
    ],
  },
];

export function Join() {
  return (
    <div className="min-h-screen bg-kort-bg">
      <header className="border-b border-kort-gold bg-kort-bg2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-kort-gold" />
              <div>
                <h1 className="font-cinzel text-2xl text-kort-gold">KoRT</h1>
                <p className="text-xs text-kort-muted">Knights of the Round Table</p>
              </div>
            </div>
            <Link
              to="/"
              className="px-6 py-2 bg-transparent border border-kort-gold text-kort-gold hover:bg-kort-gold hover:text-kort-bg transition-colors rounded font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-4xl md:text-5xl text-kort-gold mb-4">
            Join the Round Table
          </h1>
          <p className="text-kort-text text-lg max-w-2xl mx-auto">
            Choose your membership tier and become part of a community that leaves no one behind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-kort-bg2 border-2 rounded-lg p-6 hover:shadow-[0_0_12px_rgba(201,168,76,0.4)] transition-shadow ${
                tier.popular ? 'border-kort-gold' : 'border-kort-muted'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-kort-gold text-kort-bg px-4 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3
                  className="font-cinzel text-2xl font-bold mb-2"
                  style={{ color: tier.color }}
                >
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-kort-text">${tier.monthly}</span>
                  <span className="text-kort-muted">/mo</span>
                </div>
                <div className="text-sm text-kort-muted">
                  or ${tier.annual}/year
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-kort-text text-sm">
                    <Check className="w-4 h-4 text-kort-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded font-bold transition-colors"
                style={{
                  backgroundColor: tier.color,
                  color: '#fff',
                }}
              >
                Choose {tier.name}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-kort-bg2 border border-kort-gold rounded-lg p-8 mb-12">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-8 h-8 text-kort-gold flex-shrink-0" />
            <div>
              <h3 className="font-cinzel text-2xl text-kort-gold mb-3">
                No Cash? Earn Your Way In
              </h3>
              <p className="text-kort-text mb-4">
                Install Quick Stack apps via KoRT affiliate links and earn $15 in 48 hours.
                This covers your first month as an Esquire member.
              </p>
              <Link
                to="/digital-dollars"
                className="inline-block px-6 py-3 bg-kort-gold text-kort-bg font-bold rounded hover:bg-kort-gold-light transition-colors"
              >
                View Quick Stack Apps
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-kort-bg2 border border-kort-muted rounded-lg p-8 text-center">
          <h3 className="font-cinzel text-xl text-kort-gold mb-3">
            Have Questions?
          </h3>
          <p className="text-kort-muted mb-4">
            All memberships include a 7-day trial period. Cancel anytime.
          </p>
          <p className="text-kort-text text-sm">
            For support: <a href="mailto:support@kortx.ca" className="text-kort-gold hover:text-kort-gold-light">support@kortx.ca</a>
          </p>
        </div>
      </div>

      <footer className="border-t border-kort-gold bg-kort-bg2 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-kort-muted text-sm">
          <p>&copy; 2024 KoRT - Knights of the Round Table. All rights reserved.</p>
          <p className="mt-1">ALPHA - kortx.ca</p>
        </div>
      </footer>
    </div>
  );
}
