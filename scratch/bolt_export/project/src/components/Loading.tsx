import { Loader2 } from 'lucide-react';

export function Loading() {
  return (
    <div className="min-h-screen bg-kort-bg flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-kort-gold animate-spin mx-auto mb-4" />
        <p className="text-kort-muted">Loading...</p>
      </div>
    </div>
  );
}
