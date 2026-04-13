import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  Brain,
  Heart,
  Radio,
  Hammer,
  Crown,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface Stats {
  rtdBalance: number;
  totalEarned: number;
  referrals: number;
  status: string;
}

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    rtdBalance: 0,
    totalEarned: 0,
    referrals: 0,
    status: 'active',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;

      try {
        setLoading(true);
        setError('');

        const [balanceResult, earningsResult, referralsResult, membershipResult] = await Promise.all([
          supabase
            .from('token_balances')
            .select('rtd_balance')
            .eq('user_id', user.id)
            .maybeSingle(),
          supabase
            .from('earnings')
            .select('net_amount')
            .eq('user_id', user.id),
          supabase
            .from('referrals')
            .select('id')
            .eq('referrer_id', user.id),
          supabase
            .from('memberships')
            .select('status')
            .eq('user_id', user.id)
            .maybeSingle(),
        ]);

        const rtdBalance = balanceResult.data?.rtd_balance || 0;
        const totalEarned = earningsResult.data?.reduce((sum, e) => sum + (e.net_amount || 0), 0) || 0;
        const referrals = referralsResult.data?.length || 0;
        const status = membershipResult.data?.status || 'active';

        setStats({ rtdBalance, totalEarned, referrals, status });
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [user]);

  const tier = user?.user_metadata?.tier || 'page';

  return (
    <div className="min-h-screen bg-kort-bg">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-kort-gold text-kort-bg px-6 py-4 rounded-lg mb-8 flex items-center gap-3">
          <Shield className="w-6 h-6" />
          <p className="font-cinzel font-semibold">
            FOUNDING MEMBER ALPHA — You are one of the first Knights of the Round Table. Lifetime access unlocked. No one gets left behind.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-kort-gold animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-kort-danger/20 border border-kort-danger rounded-lg p-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-kort-danger" />
            <p className="text-kort-danger">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<DollarSign className="w-6 h-6" />}
                title="RTD Balance"
                value={`${stats.rtdBalance.toFixed(2)} RTD`}
              />
              <StatCard
                icon={<TrendingUp className="w-6 h-6" />}
                title="Total Earned CAD"
                value={`$${stats.totalEarned.toFixed(2)}`}
              />
              <StatCard
                icon={<Users className="w-6 h-6" />}
                title="Referrals"
                value={stats.referrals.toString()}
              />
              <StatCard
                icon={<Shield className="w-6 h-6" />}
                title="Membership Status"
                value={stats.status.toUpperCase()}
              />
            </div>

            <h2 className="font-cinzel text-3xl text-kort-gold mb-6">KoRT Apps</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppCard
                icon={<DollarSign className="w-8 h-8" />}
                title="Digital Dollars"
                description="Earn with 100+ curated apps"
                link="/digital-dollars"
              />
              <AppCard
                icon={<Brain className="w-8 h-8" />}
                title="Advocate"
                description="Navigate any system. ICBC, PWD, housing."
                comingSoon
              />
              <AppCard
                icon={<Heart className="w-8 h-8" />}
                title="Digital Detox"
                description="24/7 AI Sponsor. No shame. Real support."
                comingSoon
              />
              <AppCard
                icon={<Radio className="w-8 h-8 text-kort-danger" />}
                title="Dispatch"
                description="Community peer support coordination."
                comingSoon
                isAlert
              />
              <AppCard
                icon={<Hammer className="w-8 h-8" />}
                title="Forge"
                description="Gigs, services, barter marketplace."
                comingSoon
              />
              <AppCard
                icon={<Crown className="w-8 h-8" />}
                title="Round Table"
                description="Governance. Voting. Proposals."
                restricted={tier !== 'knight' && tier !== 'round_table'}
                comingSoon
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-kort-bg2 border border-kort-gold rounded-lg p-6 hover:shadow-[0_0_12px_rgba(201,168,76,0.4)] transition-shadow">
      <div className="flex items-center gap-3 mb-3 text-kort-gold">{icon}</div>
      <h3 className="font-cinzel text-lg text-kort-muted mb-1">{title}</h3>
      <p className="text-2xl font-bold text-kort-text">{value}</p>
    </div>
  );
}

function AppCard({
  icon,
  title,
  description,
  link,
  comingSoon,
  restricted,
  isAlert,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  comingSoon?: boolean;
  restricted?: boolean;
  isAlert?: boolean;
}) {
  const content = (
    <div
      className={`relative bg-kort-bg2 border border-kort-gold rounded-lg p-6 transition-all ${
        !comingSoon && !restricted ? 'hover:shadow-[0_0_12px_rgba(201,168,76,0.4)] cursor-pointer' : ''
      } ${comingSoon || restricted ? 'opacity-75' : ''}`}
    >
      <div className={`mb-4 ${isAlert ? 'text-kort-danger' : 'text-kort-gold'}`}>{icon}</div>
      <h3 className="font-cinzel text-xl text-kort-gold mb-2">{title}</h3>
      <p className="text-kort-muted text-sm mb-4">{description}</p>

      {comingSoon && (
        <div className="absolute top-4 right-4 bg-kort-gold text-kort-bg px-3 py-1 rounded-full text-xs font-bold">
          Coming Soon
        </div>
      )}

      {restricted && (
        <div className="absolute top-4 right-4 bg-kort-muted text-kort-bg px-3 py-1 rounded-full text-xs font-bold">
          Knight Required
        </div>
      )}

      {!comingSoon && !restricted && (
        <div className="flex items-center gap-2 text-kort-gold">
          <span className="text-sm font-semibold">Enter</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );

  if (link && !comingSoon && !restricted) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
}
