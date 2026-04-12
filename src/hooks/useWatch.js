import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'

export const CRISIS_TYPES = [
  { id: 'mental_health', label: 'Mental Health', icon: '🧠', desc: 'Peer support for emotional crisis' },
  { id: 'substance', label: 'Substance / Overdose', icon: '💊', desc: 'Harm reduction support' },
  { id: 'housing', label: 'Housing / Safety', icon: '🏠', desc: 'Shelter and safety assistance' },
  { id: 'welfare', label: 'Welfare Check', icon: '👁️', desc: 'Check on a community member' },
  { id: 'general', label: 'General Support', icon: '🤝', desc: 'Any peer support need' },
  { id: 'partner_removal', label: 'Silent Mode', icon: '🔇', desc: 'Domestic situation - silent dispatch', silent: true }
];

export function useWatch() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isResponder, setIsResponder] = useState(false);
  const [responderActive, setResponderActive] = useState(false);
  const [activeDispatch, setActiveDispatch] = useState(null);
  const [availableDispatches, setAvailableDispatches] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser(authUser);
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();
        
        if (profile) {
          setUserProfile(profile);
          setIsResponder(profile.is_responder || false);
          setResponderActive(profile.responder_active || false);
        }
      }
      setLoading(false);
    };
    initUser();
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
        setLocationError(null);
      },
      (err) => setLocationError(err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel('watch-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'crisis_events' }, (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          if (payload.new.caller_id === user.id || payload.new.assigned_knight === user.id) {
            setActiveDispatch(payload.new);
          }
          if (isResponder && responderActive) fetchAvailableDispatches();
        }
        if (payload.eventType === 'DELETE' && activeDispatch?.id === payload.old.id) {
          setActiveDispatch(null);
        }
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [user, isResponder, responderActive]);

  const fetchAvailableDispatches = useCallback(async () => {
    if (!isResponder) return;
    const { data } = await supabase
      .from('crisis_events')
      .select('*')
      .in('status', ['pending', 'assigned'])
      .order('created_at', { ascending: false });
    
    if (data) {
      const withDistance = data.map(d => ({
        ...d,
        distance: location ? calculateDistance(location.lat, location.lng, d.location_lat, d.location_lng) : null
      }));
      withDistance.sort((a, b) => (a.distance || 999) - (b.distance || 999));
      setAvailableDispatches(withDistance);
    }
  }, [isResponder, location]);

  useEffect(() => {
    if (!user) return;
    const checkActive = async () => {
      const { data: callerDispatch } = await supabase
        .from('crisis_events')
        .select('*')
        .eq('caller_id', user.id)
        .in('status', ['pending', 'assigned', 'responding', 'on_scene'])
        .single();
      if (callerDispatch) { setActiveDispatch(callerDispatch); return; }
      if (isResponder) {
        const { data: knightDispatch } = await supabase
          .from('crisis_events')
          .select('*')
          .eq('assigned_knight', user.id)
          .in('status', ['assigned', 'responding', 'on_scene'])
          .single();
        if (knightDispatch) setActiveDispatch(knightDispatch);
      }
    };
    checkActive();
    if (isResponder && responderActive) fetchAvailableDispatches();
  }, [user, isResponder, responderActive, fetchAvailableDispatches]);

  const createSOS = useCallback(async (crisisType, description = '', manualAddress = '') => {
    if (!user || !location) return { error: 'Location required' };
    const payload = {
      caller_id: user.id,
      location_lat: location.lat,
      location_lng: location.lng,
      location_address: manualAddress,
      crisis_type: crisisType,
      description: description.slice(0, 200),
      status: 'pending',
      police_involved: false,
      created_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from('crisis_events').insert(payload).select().single();
    if (data) {
      setActiveDispatch(data);
      await supabase.from('sos_events').insert({ crisis_event_id: data.id, event_type: 'created', actor_id: user.id, timestamp: new Date().toISOString() });
    }
    return { data, error };
  }, [user, location]);

  const cancelSOS = useCallback(async () => {
    if (!activeDispatch) return;
    await supabase.from('crisis_events').update({ status: 'cancelled' }).eq('id', activeDispatch.id);
    await supabase.from('sos_events').insert({ crisis_event_id: activeDispatch.id, event_type: 'cancelled', actor_id: user.id, timestamp: new Date().toISOString() });
    setActiveDispatch(null);
  }, [activeDispatch, user]);

  const toggleResponderActive = useCallback(async () => {
    if (!user || !isResponder) return;
    const newStatus = !responderActive;
    await supabase.from('users').update({ responder_active: newStatus, location_lat: location?.lat, location_lng: location?.lng }).eq('id', user.id);
    setResponderActive(newStatus);
    if (newStatus) fetchAvailableDispatches();
  }, [user, isResponder, responderActive, location, fetchAvailableDispatches]);

  const acceptDispatch = useCallback(async (dispatchId) => {
    if (!user || !isResponder) return;
    const { data, error } = await supabase.from('crisis_events').update({ assigned_knight: user.id, status: 'assigned' }).eq('id', dispatchId).eq('status', 'pending').select().single();
    if (data) {
      setActiveDispatch(data);
      await supabase.from('sos_events').insert({ crisis_event_id: data.id, event_type: 'accepted', actor_id: user.id, timestamp: new Date().toISOString() });
    }
    return { data, error };
  }, [user, isResponder]);

  const updateDispatchStatus = useCallback(async (newStatus, notes = '') => {
    if (!activeDispatch || !isResponder) return;
    const updates = { status: newStatus };
    if (notes) updates.response_notes = notes;
    if (newStatus === 'escalated') updates.police_involved = true;
    const { data, error } = await supabase.from('crisis_events').update(updates).eq('id', activeDispatch.id).select().single();
    if (data) {
      await supabase.from('sos_events').insert({ crisis_event_id: data.id, event_type: `status_${newStatus}`, actor_id: user.id, notes, timestamp: new Date().toISOString() });
      if (newStatus === 'resolved' || newStatus === 'escalated') { setActiveDispatch(null); fetchAvailableDispatches(); }
      else setActiveDispatch(data);
    }
    return { data, error };
  }, [activeDispatch, isResponder, user, fetchAvailableDispatches]);

  return { user, userProfile, isResponder, responderActive, activeDispatch, availableDispatches, location, locationError, loading, requestLocation, createSOS, cancelSOS, toggleResponderActive, acceptDispatch, updateDispatchStatus, fetchAvailableDispatches };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export default useWatch;
