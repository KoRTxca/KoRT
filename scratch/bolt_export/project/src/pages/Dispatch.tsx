import { ComingSoon } from './ComingSoon';

export function Dispatch() {
  return (
    <ComingSoon
      title="Dispatch"
      description="Community-powered crisis response and peer support coordination."
      icon="dispatch"
      features={[
        'SOS emergency alerts to your network',
        'Peer-to-peer support requests',
        'Location-based community response',
        'Crisis resource directory',
        'Check-in system for vulnerable members',
        'Wellness buddy matching',
        'Emergency contact management',
        'Community safety network',
        'Real-time status updates',
      ]}
    />
  );
}
