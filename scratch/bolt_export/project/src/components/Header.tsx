import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const TIER_COLORS = {
  page: '#555',
  esquire: '#1a3a6b',
  knight: '#c9a84c',
  'round_table': '#8b0000',
};

export function Header() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Knight';
  const tier = user?.user_metadata?.tier || 'page';

  return (
    <header className="bg-kort-bg2 border-b border-kort-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/dashboard" className="flex items-center gap-4">
            <img
              src="/assets/kort_logo_transparent.png"
              alt="KoRT Logo"
              className="h-12"
            />
            <div>
              <h1 className="font-cinzel text-2xl text-kort-gold">KoRT Hub</h1>
              <p className="text-xs text-kort-muted">ALPHA</p>
            </div>
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-kort-text">{displayName}</p>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-cinzel font-semibold"
                  style={{ backgroundColor: TIER_COLORS[tier as keyof typeof TIER_COLORS], color: '#fff' }}
                >
                  {tier.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-kort-muted hover:text-kort-gold transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
