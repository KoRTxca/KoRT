import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Loader2 } from 'lucide-react';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        navigate('/dashboard');
      } else {
        await signUp(email, password, displayName);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-kort-bg flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-16 h-16 text-kort-gold" />
          </div>
          <h1 className="font-cinzel text-4xl text-kort-gold mb-2">KoRT Hub</h1>
          <p className="text-kort-muted">Knights of the Round Table</p>
          <p className="text-xs text-kort-muted mt-1">ALPHA</p>
        </div>

        <div className="bg-kort-bg2 border border-kort-gold rounded-lg p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded font-semibold transition-colors ${
                isLogin
                  ? 'bg-kort-gold text-kort-bg'
                  : 'bg-transparent text-kort-muted border border-kort-muted hover:border-kort-gold hover:text-kort-gold'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded font-semibold transition-colors ${
                !isLogin
                  ? 'bg-kort-gold text-kort-bg'
                  : 'bg-transparent text-kort-muted border border-kort-muted hover:border-kort-gold hover:text-kort-gold'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-kort-text mb-1">
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required={!isLogin}
                  className="w-full px-4 py-2 bg-kort-bg border border-kort-gold rounded focus:outline-none focus:ring-2 focus:ring-kort-gold text-kort-text"
                  placeholder="Your Knight name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-kort-text mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-kort-bg border border-kort-gold rounded focus:outline-none focus:ring-2 focus:ring-kort-gold text-kort-text"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-kort-text mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-kort-bg border border-kort-gold rounded focus:outline-none focus:ring-2 focus:ring-kort-gold text-kort-text"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-kort-danger/20 border border-kort-danger rounded text-kort-danger text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-kort-gold text-kort-bg font-bold py-3 rounded hover:bg-kort-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/join" className="text-kort-gold hover:text-kort-gold-light transition-colors text-sm">
              Learn about membership tiers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
