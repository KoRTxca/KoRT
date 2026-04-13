import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { User, DollarSign, TrendingUp, Calendar, Loader2, Save } from 'lucide-react';

interface ProfileData {
  displayName: string;
  tier: string;
  memberSince: string;
  rtdBalance: number;
  totalEarned: number;
}

const TIER_COLORS: Record<string, string> = {
  page: '#555',
  esquire: '#1a3a6b',
  knight: '#c9a84c',
  round_table: '#8b0000',
};

export function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: '',
    tier: 'page',
    memberSince: '',
    rtdBalance: 0,
    totalEarned: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        setLoading(true);

        const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Knight';
        const tier = user.user_metadata?.tier || 'page';
        const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const [balanceResult, earningsResult] = await Promise.all([
          supabase
            .from('token_balances')
            .select('rtd_balance')
            .eq('user_id', user.id)
            .maybeSingle(),
          supabase
            .from('earnings')
            .select('net_amount')
            .eq('user_id', user.id),
        ]);

        const rtdBalance = balanceResult.data?.rtd_balance || 0;
        const totalEarned = earningsResult.data?.reduce((sum, e) => sum + (e.net_amount || 0), 0) || 0;

        setProfileData({
          displayName,
          tier,
          memberSince,
          rtdBalance,
          totalEarned,
        });
        setNewDisplayName(displayName);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setMessage('');

      const { error } = await supabase.auth.updateUser({
        data: { display_name: newDisplayName },
      });

      if (error) throw error;

      setProfileData((prev) => ({ ...prev, displayName: newDisplayName }));
      setEditMode(false);
      setMessage('Profile updated successfully');
    } catch (err) {
      setMessage('Failed to update profile');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-kort-bg">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-kort-gold animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kort-bg">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-cinzel text-4xl text-kort-gold mb-8">Profile</h1>

        <div className="bg-kort-bg2 border border-kort-gold rounded-lg p-8 mb-6">
          <div className="flex items-start gap-6 mb-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold font-cinzel"
              style={{
                backgroundColor: TIER_COLORS[profileData.tier],
                color: '#fff',
              }}
            >
              {getInitials(profileData.displayName)}
            </div>

            <div className="flex-1">
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-kort-text mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                      className="w-full px-4 py-2 bg-kort-bg border border-kort-gold rounded focus:outline-none focus:ring-2 focus:ring-kort-gold text-kort-text"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-6 py-2 bg-kort-gold text-kort-bg font-bold rounded hover:bg-kort-gold-light transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setNewDisplayName(profileData.displayName);
                      }}
                      className="px-6 py-2 bg-transparent border border-kort-muted text-kort-muted rounded hover:border-kort-gold hover:text-kort-gold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="font-cinzel text-2xl text-kort-text mb-2">
                    {profileData.displayName}
                  </h2>
                  <span
                    className="inline-block px-4 py-1 rounded-full text-sm font-cinzel font-semibold mb-4"
                    style={{
                      backgroundColor: TIER_COLORS[profileData.tier],
                      color: '#fff',
                    }}
                  >
                    {profileData.tier.replace('_', ' ').toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2 text-kort-muted mt-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Member since {profileData.memberSince}</span>
                  </div>
                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-4 px-6 py-2 bg-kort-gold text-kort-bg font-bold rounded hover:bg-kort-gold-light transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              )}

              {message && (
                <div className={`mt-4 p-3 rounded ${
                  message.includes('success')
                    ? 'bg-kort-success/20 border border-kort-success text-kort-success'
                    : 'bg-kort-danger/20 border border-kort-danger text-kort-danger'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-kort-gold/30 pt-6">
            <h3 className="font-cinzel text-xl text-kort-gold mb-4">Account Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-kort-muted">Email</span>
                <span className="text-kort-text">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-kort-muted">User ID</span>
                <span className="text-kort-text font-mono text-sm">
                  {user?.id.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-kort-bg2 border border-kort-gold rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3 text-kort-gold">
              <DollarSign className="w-6 h-6" />
              <h3 className="font-cinzel text-lg">RTD Balance</h3>
            </div>
            <p className="text-3xl font-bold text-kort-text">
              {profileData.rtdBalance.toFixed(2)} RTD
            </p>
          </div>

          <div className="bg-kort-bg2 border border-kort-gold rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3 text-kort-gold">
              <TrendingUp className="w-6 h-6" />
              <h3 className="font-cinzel text-lg">Total Earned</h3>
            </div>
            <p className="text-3xl font-bold text-kort-text">
              ${profileData.totalEarned.toFixed(2)} CAD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
